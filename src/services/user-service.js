import {
    httpService
} from './http.service.js'
// const STORAGE_KEY = 'user'
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
    // changeScore
}

window.userService = userService;

const USER_URL = (process.env.NODE_ENV !== 'development') ?
    '/auth' :
    '//localhost:3030/api/auth';

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
        // gWatchedUser = user;
    return user;
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
        // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

//////////Auth User////////////

async function login(user) {
    try {
        // const res = await axios.post(USER_URL + '/login', user)
        const loggedUser = await httpService.post('auth/login', user)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser));
        // console.log('loggedUser:',loggedUser);
        return loggedUser
    } catch (err) {
        console.log('login err:', err);
    }
}

async function signup(userInfo) {
    try {
        // const res = await axios.post(USER_URL + '/signup', userInfo)
        // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        await httpService.post('auth/signup', userInfo)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userInfo))
    } catch (err) {
        console.log('signup err:', err);
    }

}
//guest userid: 624559a71ec4197167765f73
async function logout() {
    try {
        // const res = await axios.post(USER_URL + '/logout')
        // const guestUser = await getById('624559a71ec4197167765f73')
        // console.log('guestUser:', guestUser)
        await httpService.post('auth/logout')
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
            // return res.data
    } catch (err) {
        console.log('logout err:', err);
    }
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))

}