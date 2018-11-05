import { actions } from './actions'
import { getters } from './getters'
import { initialState, mutations } from './mutations'
import { windowProperties } from './window-properties/module'

export const storeOptions = {
    state: initialState,
    actions,
    getters,
    mutations,
    modules: {
        windowProperties
    }
}
