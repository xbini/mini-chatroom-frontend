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
}
export interface IToastState extends IToastPayload {
    show: boolean
}

const state: IToastState = {
    show: false,
    type: ToastType.Primary,
    message: ""
}

export enum ToastActionType {
    Open = "Open toast",
    OpenSuccess = "Open toast success",
    OpenFailed = "Open toast failed",
    Close = "Close toast",
    CloseSuccess = "Close toast success",
    CloseFailed = "Close toast failed"
}

const mutations = {
    [ToastActionType.OpenSuccess](state: IToastState, payload: IToastPayload) {
        state.show = true
        state.message = payload.message
        state.type = payload.type || state.type
    },
    [ToastActionType.Close](state: IToastState) {
        state.show = false
    }
}

const actions = {
    [ToastActionType.Open](context: any, payload: IToastPayload) {
        context.commit(ToastActionType.OpenSuccess, payload)
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
