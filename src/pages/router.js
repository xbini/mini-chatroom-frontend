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
            path: '/window-properties',
            // component: () => import(/* webpackChunkName: 'list.component' */'./window-properties/list.component')
            component: () => import('./window-properties/list.component')
        }
    ]
    return new VueRouter({ routes })
}
