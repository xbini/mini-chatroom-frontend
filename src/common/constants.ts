export enum WS_EVENT {
    INIT = 'init',
    SEND_CHAT = 'send-chat-from-client',
    RECEIVE_CHAT = 'receive-chat-from-server',
    ALWAYS_PUSH = 'always-push'
}

export const TIME_FORMAT = 'HH:mm:ss'

export const SOUGOU_IMG_REG = /点击\[(.*)\]查看表情/

export interface ResponseSchema<T> {
    status: number
    data?: T,
    message: string
}

export const STORAGE_TOKEN_KEY = "TOKEN"

export interface IRequestPayload<T> {
    meta: {
        needSpinner?: boolean
        needToast?: boolean
    }
    body: T
}
