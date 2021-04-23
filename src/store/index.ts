import { createLogger, createStore } from 'vuex'
import authentication, { IAuthenticationState } from './authentication'
import chatroom, { IChatroomState } from './chatroom'
import toast, { IToastState } from './toast'

export interface AppState {
    chatroom: IChatroomState
    authentication: IAuthenticationState
    toast: IToastState
}

const store = createStore<AppState>({
    plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger({
        collapsed: true
    })],
    strict: process.env.NODE_ENV === 'production',
    modules: {
        chatroom,
        authentication,
        toast
    }
})
export default store
