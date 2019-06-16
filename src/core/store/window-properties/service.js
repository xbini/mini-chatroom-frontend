export function loadList() {
    return new Promise(((resolve) => {
        setTimeout(() => {
            const array = Object.keys(window).map(key => ({ name: key, content: String(window[key]) }))
            resolve(array)
        }, 1000)
    }))
}
