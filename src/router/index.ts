import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { STORAGE_TOKEN_KEY } from '../common/constants'
import Login from '../pages/Login.vue'


const routes: Array<RouteRecordRaw> = [
    { path: '', redirect: '/chatroom' },
    { path: '/login', component: Login },
    { path: '/chatroom', component: () => import('../pages/Chatroom.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const isAuthorized = () => {
    return Boolean(localStorage.getItem(STORAGE_TOKEN_KEY))
}

const UNAUTHORIZED_PATH = [
    "/login"
]

router.beforeEach(to => {
    const authorized = isAuthorized()
    if (!UNAUTHORIZED_PATH.includes(to.path) && !authorized) {
        router.push('/login')
        return false
    }
})

export default router
