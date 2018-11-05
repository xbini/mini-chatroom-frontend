import axios from 'axios'
import { API_PREFIX } from './core-api'

/**
 * 注册axios的拦截器
 * @param router
 * @returns {boolean}
 */
export function registerHttpInterceptor(router) {
    if (!router) {
        return false
    }

    function requestCorrect(request) {
        const { url } = request
        request.url = `${API_PREFIX}${url}`
        return request
    }

    function requestError(error) {
        return Promise.reject(error)
    }

    function responseCorrect(response) {
        return response
    }

    function responseError(error) {
        return Promise.reject(error)
    }

    axios.interceptors.request.use(requestCorrect, requestError)
    axios.interceptors.response.use(responseCorrect, responseError)
    return true
}
