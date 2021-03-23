import { h } from "vue"
import { SOUGOU_IMG_REG } from "./constants"

export function parseName(ip: string, tag: string) {
    const name = `${tag}-(${ip})`
    return (name || 'Name').replace('::ffff:', '')
}

export function parseFooter(userAgent: any) {
    let result = ''
    const i = userAgent.match(/\(/).index
    const j = userAgent.match(/\)/).index
    result = userAgent.substring(i + 1, j)
    return result || 'unknown'
}

export function renderChatContent(content: string) {
    const matched = content.match(SOUGOU_IMG_REG)
    const url = matched ? matched[1] : undefined
    if (url) {
        return h(
            'img',
            {
                style: 'width: 100px;',
                src: url
            }
        )
    }
    return h(
        'div',
        {
            style: 'word-break: break-all;',
            innerText: content || 'this is content',
        }
    )
}

export function generateAvatar() {
    const tag = parseInt(String(Math.random() * 10000000), 10);
    return 'https://avatars.githubusercontent.com/u/' + tag + '?s=60&v=4';
}
