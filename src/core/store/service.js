export function setLocalStorage(key, value) {
    return new Promise(((resolve) => {
        window.localStorage.setItem(key, value)
        resolve({ key, value })
    }))
}
