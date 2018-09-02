import VueRouter from 'vue-router'
import { EntryPageComponent } from './entry/entry.component'

export function getRouter(option = {}) {
    const routes = [
        {
            path: '',
            redirect: '/entry'
        },
        {
            path: '/entry',
            component: EntryPageComponent
        }
    ]
    return new VueRouter({ routes })
}
