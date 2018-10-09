export const mutationTypes = {
    UPDATE_LIST: 'update list',
    RESTORE_LIST: 'restore list'
}

export const mutations = {
    [mutationTypes.UPDATE_LIST](state, payload) {
        state.list = payload.data
    },
    [mutationTypes.RESTORE_LIST](state) {
        state.list = []
    }
}
