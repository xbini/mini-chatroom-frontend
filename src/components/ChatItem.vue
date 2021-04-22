<template>
  <div class="clearfix chat-item">
    <img class="avatar pull-left" :src="computedAvatar" alt="avatar" />
    <div class="info">
      <div>
        <strong class="text-primary" :class="isSelf ? 'bg-danger' : ''">
          {{ name }}
        </strong>
        <small class="text-muted">&nbsp;{{ time }}</small>
      </div>
      <ChatContent :content="content" class="content" />
      <div class="text-right">
        <small>
          from
          <span class="text-danger">{{ footer }}</span>
        </small>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Store, useStore } from "vuex"

import ChatContent from './ChatContent.vue'
import { generateAvatar } from '../common/helper'
import { ChatroomActionType } from '../store/chatroom'
import { AppState } from '../store'

const ChatItem = defineComponent({
  components: {
    ChatContent
  },
  props: {
    avatar: {
      type: String
    },
    time: {
      type: String
    },
    tag: {
      type: String
    },
    name: {
      type: String
    },
    content: {
      type: String
    },
    footer: {
      type: String
    }
  },
  setup(props) {
    const store: Store<AppState> = useStore()

    const computedAvatar = computed(() => {
      const { avatar } = props
      if (avatar) {
        store.dispatch(ChatroomActionType.UpdateCurrentAvatar, avatar)
        return avatar
      }
      const { currentAvatar } = store.state.chatroom
      if (currentAvatar) {
        return currentAvatar
      }
      store.dispatch(ChatroomActionType.UpdateCurrentAvatar, generateAvatar())
      return store.state.chatroom.currentAvatar
    })

    const isSelf = computed(() => {
      const { tag } = props
      return store.state.chatroom.currentTag === tag
    })

    return {
      isSelf,
      computedAvatar
    }
  }
})
export default ChatItem
</script>

<style lang="scss" scoped>
.chat-item img.avatar {
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
}

.chat-item {
  margin-bottom: 10px;
}

.chat-item:last-of-type {
  margin-bottom: 0;
}

.chat-item .info {
  margin-left: 50px;
}
</style>
