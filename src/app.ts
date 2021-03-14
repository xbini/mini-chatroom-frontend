import { createApp } from '@vue/runtime-dom'
import './style/index.scss'
import registerHttpInterceptor from './common/http-interceptor'
import directives from './directives'
import router from './router'
import store from './store'

const app = createApp({
})

registerHttpInterceptor()
app.use(router)
app.use(store)
directives.forEach((directive) => {
    app.directive(directive.name, directive.Directive)
})
app.mount('#app')
