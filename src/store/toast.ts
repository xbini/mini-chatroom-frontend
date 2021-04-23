import { TOAST_KEEP } from "../common/constants"

export enum ToastType {
    Primary = "primary",
    Success = "success",
    Info = "info",
    Warning = "warning",
    Danger = "danger"
}

export interface IToastPayload {
    type?: ToastType
    message?: string
    keep?: number
}
export interface IToastState extends IToastPayload {
    show: boolean
}

const state: IToastState = {
    show: false,
    type: ToastType.Danger,
    message: ""
}

export enum ToastActionType {
    Open = "open toast",
    OpenSuccess = "open toast success",
    OpenFailed = "open toast failed",
    Close = "close toast",
    CloseSuccess = "close toast success",
    CloseFailed = "close toast failed"
}

const mutations = {
    [ToastActionType.OpenSuccess](state: IToastState, payload: IToastPayload) {
        state.show = true
        state.message = payload.message
        state.type = payload.type || state.type
    },
    [ToastActionType.Close](state: IToastState) {
        state.message = ''
        state.show = false
    }
}

let timer = -1
const actions = {
    [ToastActionType.Open](context: any, payload: IToastPayload) {
        context.commit(ToastActionType.OpenSuccess, payload)
        clearTimeout(timer)
        timer = window.setTimeout(() => context.commit(ToastActionType.Close), payload.keep || TOAST_KEEP)
    },
    [ToastActionType.Close](context: any) {
        context.commit(ToastActionType.CloseSuccess)
    }
}

const getters = {

}

const toast = {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}

export default toast
