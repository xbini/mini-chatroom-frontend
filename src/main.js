import { Vue } from 'vue-property-decorator'
import createLogger from 'vuex/dist/logger'
import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import ELEMENT from 'element-ui'
import './style/index.scss'
import { storeOptions } from './core/store'
import { createRouter } from './core/router'
import { registerHttpInterceptor } from './core/http-interceptor'
import { version } from '../package'
import { commonComponents } from './components'
import { commonFilters } from './filters'
import { commonDirectives } from './directives'

Vue.use(Vuex)
Vue.use(VueRouter)

// 使用ElementUI
Vue.use(ELEMENT)

// 注册公共filter
commonFilters.forEach((filter) => {
    Vue.filter(filter.name, filter.Filter)
})

// 注册公共directive
commonDirectives.forEach((directive) => {
    Vue.directive(directive.name, directive.Directive)
})

// 注册自定义公共组件
commonComponents.forEach((component) => {
    Vue.component(component.name, component.Component)
})

const store = new Store({
    plugins: process.env.NODE_ENV !== 'development' ? [] : [createLogger({
        collapsed: true
    })],
    strict: process.env.NODE_ENV !== 'development',
    ...storeOptions
})

function launch() {
    const router = createRouter()
    const app = new Vue({
        store,
        router
    })
    registerHttpInterceptor(router)
    app.$mount('#app')
}

launch()

// 记录版本号
window.feversion = version
