import { createLogger, createStore } from 'vuex'
import chatroom from './chatroom'

const store = createStore({
    plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger({
        collapsed: true
    })],
    strict: process.env.NODE_ENV === 'production',
    modules: {
        chatroom
    }
})
export default store
