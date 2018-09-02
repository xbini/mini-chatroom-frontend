import { Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import { getRouter } from './pages/router'

Vue.use(VueRouter)

export const app = new Vue({
    router: getRouter()
})

app.$mount('#app')
