// element-ui form 表单验证所需格式
/**
 * required validator
 * @param message {String}
 * @param trigger {Array}
 * @returns {{required: boolean, message: string, trigger: string[]}}
 */
export const createFormRequiredValidator = (message = '', trigger = ['blur']) => ({ required: true, message, trigger })

/**
 * length validator
 * @param min {Number}
 * @param max {Number}
 * @param message {String}
 * @param trigger {Array}
 * @returns {{min: number, max: number, message: string, trigger: string[]}}
 */
export const createFormLengthValidator = (min = -Infinity, max = Infinity, message = '长度不匹配', trigger = ['blur']) => ({
    min, max, message, trigger
})

/**
 * customer validator
 * @param validator {Function}
 * @param trigger {Array}
 * @returns {{validator: *, trigger: string[]}}
 */
export const createFormCustomValidator = (validator = Function, trigger = ['blur']) => ({ validator, trigger })

/**
 * 值对比，自定义验证函数
 * @param form {String||Number}
 * @param key {String}
 * @param message {String}
 * @returns {Function}
 */
export const compareValidator = (form = {}, key = '', message = '两次输入密码不一致') => (rule, value, callback) => {
    if ((key in form) === false) {
        callback()
    }
    const compare = form[key]
    if (value !== compare) {
        callback(new Error(message))
    } else {
        callback()
    }
}

/**
 * 解析http响应消息
 * @param error {Object} axios 返回的标准http错误对象或后端返回status !== 0的数据对象
 * @returns {*}
 */
export function resolveServerErrorMessage(error) {
    const { data } = error
    let msg = error.message
    if (data && data.message) {
        msg = data.message
    }
    msg = msg || '未知错误'

    return msg
}

/**
 * 请求数据提示装饰器
 * @param options {Object} @ServerMessage(<option>) 使用时的参数
 * @return {function(*=, *=, *=): *}
 */
export function ServerMessage(options = {}) {
    const fullOptions = { successMessage: '', failedMessage: '', ...options }
    const { successMessage, failedMessage } = fullOptions
    return function (target, name, descriptor) {
        const { value } = descriptor
        descriptor.value = function (...args) {
            const { $message } = this
            const out = value.apply(this, args)
            if ($message) {
                if (out instanceof Promise) {
                    return out
                        .then((res) => {
                            const { data } = res
                            if (data.status === 0) {
                                if (successMessage) {
                                    $message({ message: successMessage, type: 'success' })
                                }
                                return res
                            }
                            return Promise.reject(res)
                        })
                        .catch((error) => {
                            if (failedMessage) {
                                $message({ message: failedMessage, type: 'error' })
                            } else {
                                const message = resolveServerErrorMessage(error)
                                $message({ message, type: 'error' })
                            }
                            return Promise.reject(error)
                        })
                }
            }
            return out
        }
        return descriptor
    }
}
