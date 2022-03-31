import {
    userService
} from '../../services/user-service.js'

export default {
    state: {
        loggedinUser: userService.getLoggedinUser(),
        users: [],
        watchedUser: null
    },
    getters: {
        loggedinUser({loggedinUser}) {
            return loggedinUser
        },
        users({users}) {
            return users
        },
        watchedUser({watchedUser}) {
            return watchedUser
        }
    },
    mutations: {
        login(state, {user}) {
            state.loggedinUser = (user) ? {
                ...user
            } : null;

        },
        logout(state) {
            state.loggedinUser = null;
        },
        setUsers(state, {users}) {
            state.users = users;
        },
        setWatchedUser(state, {user}) {
            state.watchedUser = user;
        },
        removeUser(state, {userId}) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        // setUserScore(state, {score}) {
        //     state.loggedinUser.score = score
        // },
    },
    actions: {
        async login({
            commit
        }, {
            user
        }) {
            console.log('user:', user);
            try {
                const newUser = await userService.login(user)
                commit({ type: 'login', user: newUser})
            } catch (err) {
                console.log('err');
            }

        },
        async logout({commit }) {
            try {
                await userService.logout()
                commit({
                    type: 'logout'
                })
            } catch (err) {
                console.log('err');
            }
        },
        async signup({commit}, {user}) {
            try {
                await userService.signup(user)
                commit({type: 'login',user })
            } catch (err) {
                console.log('err');
            }
        },
        async loadUsers({commit}) {
            // TODO: loading
            try {
                const users = await userService.getUsers();
                commit({type: 'setUsers',users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async loadAndWatchUser({ commit}, {userId}) {
            try {
                const user = await userService.getById(userId);
                commit({
                    type: 'setWatchedUser',
                    user
                })
                // socketService.emit(SOCKET_EMIT_USER_WATCH, userId) 
                console.log('user:', user);
                socketService.off(SOCKET_EVENT_USER_UPDATED)
                socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                    commit({type: 'setWatchedUser', user })})
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async removeUser({ commit}, { userId}) {
            try {
                await userService.remove(userId);
                commit({ type: 'removeUser', userId})
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({commit}, {user}) {
            try {
                user = await userService.update(user);
                commit({
                    type: 'setUser',
                    user
                })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
        // async increaseScore({commit}) {
        //     try {
        //         const score = await userService.changeScore(100)
        //         commit({
        //             type: 'setUserScore',
        //             score
        //         })
        //     } catch (err) {
        //         console.log('userStore: Error in increaseScore', err)
        //         throw err
        //     }
        // }
    },
}