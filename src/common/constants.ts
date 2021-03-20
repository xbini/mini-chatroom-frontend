export enum WS_EVENT {
    INIT = 'init',
    SEND_CHAT = 'send-chat-from-client',
    RECEIVE_CHAT = 'receive-chat-from-server',
    ALWAYS_PUSH = 'always-push'
}

export const TIME_FORMAT = 'HH:mm:ss'

export const SOUGOU_IMG_REG = /点击\[(.*)\]查看表情/
