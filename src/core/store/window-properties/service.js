export function loadList() {
    return new Promise(((resolve) => {
        setTimeout(() => {
            resolve(Object.keys(window))
        }, 1000)
    }))
}
