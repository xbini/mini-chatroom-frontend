import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export const windowProperties = {
    namespaced: true,
    state: { list: [] },
    mutations,
    getters,
    actions
}
