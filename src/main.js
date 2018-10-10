import { Vue } from 'vue-property-decorator'
import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import { getRouter } from './pages/router'
import './style/index.scss'
import { storeOptions } from './core/store'
import { usageAntDesignComponents } from './antd-components'

Vue.use(Vuex)
Vue.use(VueRouter)
usageAntDesignComponents.forEach((c) => {
    Vue.component(c.name, c)
})

const store = new Store({
    strict: process.env.NODE_ENV !== 'development',
    ...storeOptions
})

export const app = new Vue({
    store,
    router: getRouter()
})

app.$mount('#app')
