export interface ChatroomState {
    currentAvatar: string | null,
    currentTag: string | null
}

export interface ChatroomStateForUseStore {
    chatroom: ChatroomState
}

const state: ChatroomState = {
    currentAvatar: '',
    currentTag: ''
}

export enum ChatroomActionType {
    UpdateCurrentAvatar = "> update current avatar",
    UpdateCurrentTag = "> update current tag"
}

const mutations = {
    [ChatroomActionType.UpdateCurrentAvatar](state: ChatroomState, avatar: string) {
        state.currentAvatar = avatar
    },
    [ChatroomActionType.UpdateCurrentTag](state: ChatroomState, tag: string) {
        state.currentTag = tag
    }
}

const actions = {
    [ChatroomActionType.UpdateCurrentAvatar](context: any, payload: string) {
        context.commit(ChatroomActionType.UpdateCurrentAvatar, payload);
    },
    [ChatroomActionType.UpdateCurrentTag](context: any, payload: string) {
        context.commit(ChatroomActionType.UpdateCurrentTag, payload);
    }
}

const getters = {

}

const chatroom = {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}

export default chatroom
