import { createLogger, createStore } from 'vuex'

interface State {
    count: number
}
const store = createStore({
    plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger({
        collapsed: true
    })],
    strict: process.env.NODE_ENV === 'production',
    state(): State {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state: State) {
            state.count++
        }
    }
})
export default store
