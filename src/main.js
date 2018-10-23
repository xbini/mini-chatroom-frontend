import { Vue } from 'vue-property-decorator'
import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import ELEMENT from 'element-ui'
import './style/index.scss'
import { storeOptions } from './core/store'
import { getRoutes } from './pages/routes'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ELEMENT)

const store = new Store({
    strict: process.env.NODE_ENV !== 'development',
    ...storeOptions
})

export const app = new Vue({
    store,
    router: new VueRouter({ routes: getRoutes() })
})

app.$mount('#app')
