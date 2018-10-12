/* eslint-disable no-unused-vars */
import EntryPageComponent from './entry/entry.component'

/**
 *
 * @param {Object} option: 可以是权限相关配置，动态解析适合的路由
 * @returns {*[]}
 */
export function getRoutes(option = {}) {
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
                    path: 'sort',
                    // component: () => import(/* webpackChunkName: 'list.component' */'./sort/sort.component')
                    component: () => import('./sort/sort.component')
                },
                {
                    path: 'window-properties',
                    component: () => import('./window-properties/list.component')
                }
            ]
        }
    ]
    return routes
}
