import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_PATH, API_PREFIX } from './api-list'
import { STORAGE_TOKEN_KEY } from './constants'

const publicPaths = [API_PATH.AUTHENTICATION]

export default function registerHttpInterceptor() {
    function requestCorrect(request: AxiosRequestConfig) {
        const { url } = request
        request.url = `${API_PREFIX}${url}`
        const header = { token: localStorage.getItem(STORAGE_TOKEN_KEY) || undefined }
        !publicPaths.includes(url as string) && (request.headers = { ...request.headers, ...header })
        return request
    }

    function requestError(error: AxiosError) {
        return Promise.reject(error)
    }

    function responseCorrect(response: AxiosResponse) {
        return response
    }

    function responseError(error: AxiosError) {
        return Promise.reject(error)
    }

    axios.interceptors.request.use(requestCorrect, requestError)
    axios.interceptors.response.use(responseCorrect, responseError)
    return true
}
