import { SOUGOU_IMG_REG } from "./constants"

export function parseName(ip: string, tag: string) {
    const name = `${tag}-(${ip})`
    return (name || 'Name').replace('::ffff:', '')
}

export function parseFooter(userAgent: any) {
    var result = ''
    var i = userAgent.match(/\(/).index
    var j = userAgent.match(/\)/).index
    result = userAgent.substring(i + 1, j)
    return result || 'unknown'
}

export function parseContent(content: string) {
    var result = content
    var matched = content.match(SOUGOU_IMG_REG)
    var url = matched ? matched[1] : undefined
    if (url) {
        result = "<img class='content-image' src='" + url + "'/>"
    }
    return result || 'this is content'
}

export function generateAvatar() {
    const tag = parseInt(String(Math.random() * 10000000), 10);
    return 'https://avatars.githubusercontent.com/u/' + tag + '?s=60&v=4';
}
