import { loadList } from './service'
import { mutationTypes } from './mutations'

export const actionTypes = {
    GET_LIST: 'get list'
}

export const actions = {
    [actionTypes.GET_LIST]({ commit }) {
        return loadList()
            .then((res) => {
                commit(mutationTypes.UPDATE_LIST, { data: res })
            })
    }
}
