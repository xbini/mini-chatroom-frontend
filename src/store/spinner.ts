import { Store } from "vuex"

export interface ISpinnerPayload {
}
export interface ISpinnerState {
    show: boolean
}

const state: ISpinnerState = {
    show: false
}

export enum SpinnerActionType {
    Start = "start spinner",
    StartSuccess = "start spinner success",
    Stop = "stop spinner",
    StopSuccess = "stop spinner success"
}

const mutations = {
    [SpinnerActionType.StartSuccess](state: ISpinnerState) {
        state.show = true
    },
    [SpinnerActionType.StopSuccess](state: ISpinnerState) {
        state.show = false
    }
}

const actions = {
    [SpinnerActionType.Start](context: any) {
        context.commit(SpinnerActionType.StartSuccess)
    },
    [SpinnerActionType.Stop](context: any) {
        context.commit(SpinnerActionType.StopSuccess)
    }
}

const getters = {

}

const spinner = {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}

export default spinner
