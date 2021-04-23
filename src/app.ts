import { createApp } from 'vue'
import './style/index.scss'
import registerHttpInterceptor from './common/http-interceptor'
import directives from './directives'
import router from './router'
import store from './store'
import Spinner from './components/Spinner.vue'
import Toast from './components/Toast.vue'

const app = createApp({
    components: {
        Toast,
        Spinner
    }
})

registerHttpInterceptor()
app.use(router)
app.use(store)
directives.forEach((directive) => {
    app.directive(directive.name, directive.Directive)
})
app.mount('#app')
