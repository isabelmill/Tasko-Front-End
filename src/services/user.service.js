import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
}

window.userService = userService

// ======= User CRUD =======
function getUsers() {
  return httpService.get('user')
}

async function getById(userId) {
  return await httpService.get(`user/${userId}`)
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user)
  if (getLoggedinUser()?._id === user._id) _saveLocalUser(user)
  return user
}

// ======= Auth =======
async function login({ username, password }) {
  try {
    const loggedUser = await httpService.post('auth/login', { username, password })
    _saveLocalUser(loggedUser)
    return loggedUser
  } catch (err) {
    console.log('login error:', err.response?.data || err)
    throw err
  }
}

async function signup({ username, password, fullname }) {
  try {
    const loggedUser = await httpService.post('auth/signup', { username, password, fullname })
    _saveLocalUser(loggedUser)
    return loggedUser
  } catch (err) {
    console.log('signup error:', err.response?.data || err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post('auth/logout')
    _saveLocalUser(null)
  } catch (err) {
    console.log('logout error:', err.response?.data || err)
    throw err
  }
}

// ======= Helpers =======
function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _saveLocalUser(user) {
  if (!user) sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  else sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}
