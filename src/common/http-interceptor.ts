import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_PREFIX } from './api-list'

export default function registerHttpInterceptor() {
    function requestCorrect(request: AxiosRequestConfig) {
        const { url } = request
        request.url = `${API_PREFIX}${url}`
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
