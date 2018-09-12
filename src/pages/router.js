/* eslint-disable no-unused-vars */
import VueRouter from 'vue-router'
import EntryPageComponent from './entry/entry.component'

export function getRouter(option = {}) {
    const routes = [
        {
            path: '',
            redirect: '/entry'
        },
        {
            path: '/entry',
            component: EntryPageComponent
        },
        {
            path: '/list',
            // component: () => import(/* webpackChunkName: 'list.component' */'./list/list.component')
            component: () => import('./list/list.component')
        }
    ]
    return new VueRouter({ routes })
}
