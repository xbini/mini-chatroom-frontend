/* eslint-disable no-unused-vars */
import VueRouter from 'vue-router'
import EntryPageComponent from '../../pages/entry/entry.component'

/**
 *
 * @param {Object} option: 可以是权限相关配置，动态解析适合的路由
 * @returns {*}
 */
export function createRouter(option = {}) {
    const routes = [
        {
            path: '',
            redirect: '/entry'
        },
        {
            path: '/entry',
            component: EntryPageComponent,
            children: [
                {
                    path: '',
                    redirect: 'sort'
                },
                {
                    path: 'sort',
                    // component: () => import(/* webpackChunkName: 'list.component' */'./sort/sort.component')
                    component: () => import('../../pages/sort/sort.component')
                },
                {
                    path: 'window-properties',
                    component: () => import('../../pages/window-properties/list.component')
                }
            ]
        }
    ]

    return new VueRouter({ routes: routes })
}
