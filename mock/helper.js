export function schema(data, message = "operation successful.", status = 0) {
    return {
        status,
        data,
        message
    }
}

export function okMessage(message) {
    return schema(undefined, message)
}

export function errorMessage(message = 'an unknown exception.') {
    return schema(undefined, message, -1)
}
