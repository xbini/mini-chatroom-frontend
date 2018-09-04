import { Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import { getRouter } from './pages/router'
import './style/index.scss'

Vue.use(VueRouter)

export const app = new Vue({
    router: getRouter()
})

app.$mount('#app')
