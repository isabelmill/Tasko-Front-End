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

window.userService = userService;

// ======= User CRUD =======

function getUsers() {
    return httpService.get('user')
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
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

async function login(user) {
    try {
        const loggedUser = await httpService.post('auth/login', user)
        _saveLocalUser(loggedUser)
        return loggedUser
    } catch (err) {
        console.log('login err:', err)
    }
}

async function signup(userInfo) {
    try {
        const loggedUser = await httpService.post('auth/signup', userInfo)
        _saveLocalUser(loggedUser)
        return loggedUser
    } catch (err) {
        console.log('signup err:', err)
    }
}

// Guest user fallback for logout
async function logout() {
    try {
        const guestUser = await getById('624559a71ec4197167765f73')
        await httpService.post('auth/logout')
        _saveLocalUser(guestUser)
    } catch (err) {
        console.log('logout err:', err)
    }
}

// ======= Helpers =======

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}