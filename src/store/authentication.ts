import axios, { AxiosResponse } from "axios"
import { API_PATH } from "../common/api-list"
import { IRequestPayload, ResponseSchema, STORAGE_TOKEN_KEY } from "../common/constants"
import { generateErrorMessage } from "../common/helper"
import { ToastActionType } from "./toast"

export interface IAuthenticationReqSchema {
    username: string
    password: string
    remember: boolean
}

export interface IAuthenticationResSchema {
    token: string
}

export interface IAuthenticationState {
    token: string
}


const state: IAuthenticationState = {
    token: ''
}

export enum AuthenticationActionType {
    Authentication = "authentication",
    AuthenticationSuccess = "authentication success",
    AuthenticationFailed = "authentication failed",
    Deauthorization = "deauthorization",
    DeauthorizationSuccess = "deauthorization success",
    DeauthorizationFailed = "deauthorization failed"
}

const mutations = {
    [AuthenticationActionType.AuthenticationSuccess](state: IAuthenticationState, token: string) {
        state.token = token
        localStorage.setItem(STORAGE_TOKEN_KEY, state.token)
    },
    [AuthenticationActionType.AuthenticationFailed](state: IAuthenticationState) {
        state.token = ''
        localStorage.setItem(STORAGE_TOKEN_KEY, state.token)
    },
    [AuthenticationActionType.DeauthorizationSuccess](state: IAuthenticationState) {
        state.token = ''
        localStorage.setItem(STORAGE_TOKEN_KEY, state.token)
    },
    [AuthenticationActionType.DeauthorizationFailed](state: IAuthenticationState) {
    }
}

const actions = {
    async [AuthenticationActionType.Authentication](context: any, payload: IRequestPayload<IAuthenticationReqSchema>) {
        const { meta: { needSpinner, needToast } } = payload
        console.log(context)
        try {
            const response: AxiosResponse<ResponseSchema<IAuthenticationResSchema>> = await axios.post(API_PATH.AUTHENTICATION, payload.body)
            context.commit(AuthenticationActionType.AuthenticationSuccess, response.data.data?.token)
            return Promise.resolve(response)
        } catch (error) {
            context.commit(AuthenticationActionType.AuthenticationFailed)
            needToast && context.dispatch(ToastActionType.Open, { message: generateErrorMessage(error) })
            return Promise.reject(error)
        }
    }
}

const getters = {

}

const authentication = {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}

export default authentication
