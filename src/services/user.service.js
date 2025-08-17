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
  return httpService.get('/user')
}

async function getById(userId) {
  return httpService.get(`/user/${userId}`)
}

function remove(userId) {
  return httpService.delete(`/user/${userId}`)
}

async function update(user) {
  const updatedUser = await httpService.put(`/user/${user._id}`, user)
  if (getLoggedinUser()?._id === updatedUser._id) _saveLocalUser(updatedUser)
  return updatedUser
}

// ======= Auth =======
async function login(credentials) {
  const loggedUser = await httpService.post('/auth/login', credentials)
  _saveLocalUser(loggedUser)
  return loggedUser
}

async function signup(userInfo) {
  const loggedUser = await httpService.post('/auth/signup', userInfo)
  _saveLocalUser(loggedUser)
  return loggedUser
}

async function logout() {
  await httpService.post('/auth/logout')
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

// ======= Helpers =======
function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}
