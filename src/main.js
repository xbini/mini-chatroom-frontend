import { Vue } from 'vue-property-decorator'
import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import './style/index.scss'
import { storeOptions } from './core/store'
import { usedElementComponents } from './element-components'
import { getRoutes } from './pages/routes'

Vue.use(Vuex)
Vue.use(VueRouter)
usedElementComponents.forEach((c) => {
    Vue.use(c)
})

const store = new Store({
    strict: process.env.NODE_ENV !== 'development',
    ...storeOptions
})

export const app = new Vue({
    store,
    router: new VueRouter({ routes: getRoutes() })
})

app.$mount('#app')
