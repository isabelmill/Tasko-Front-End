import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import boardApp from '../views/board-app.vue'
import boardDetails from '../views/board-details.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/board',
            name: 'board-app',
            component: boardApp,
        },
        {
            path: '/board/:boardId',
            name: 'board-details',
            component: boardDetails,
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/signup',
            name: 'signup',
            component: signup,
        },
    ]
})

export default router