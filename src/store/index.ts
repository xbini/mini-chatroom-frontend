import { createLogger, createStore } from 'vuex'
import authentication, { IAuthenticationState } from './authentication'
import chatroom, { IChatroomState } from './chatroom'

export interface AppState {
    chatroom: IChatroomState
    authentication: IAuthenticationState
}

const store = createStore({
    plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger({
        collapsed: true
    })],
    strict: process.env.NODE_ENV === 'production',
    modules: {
        chatroom,
        authentication
    }
})
export default store
