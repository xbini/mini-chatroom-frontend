/* eslint-disable no-unused-vars */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Chatroom from '../pages/Chatroom.vue'


const routes: Array<RouteRecordRaw> = [
    { path: '', redirect: '/chatroom' },
    { path: '/login', component: () => import('../pages/Login.vue') },
    { path: '/chatroom', component: Chatroom }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
