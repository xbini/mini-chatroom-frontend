<template>
  <div class="clearfix chat-item">
    <img class="avatar pull-left" :src="avatar || defaultAvatar" alt="avatar" />
    <div class="info">
      <div>
        <strong class="text-primary {selfClass}">{{ name }}</strong>
        <small class="text-muted">{{ time }}</small>
      </div>
      <div class="content">{{ content }}</div>
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
import { generateAvatar } from '../common/helper'

let avatar = ''

const ChatItem = defineComponent({
  props: {
    avatar: {
      type: String
    },
    time: {
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
    const defaultAvatar = computed(() => generateAvatar())
    let isSelf = false

    return {
      isSelf,
      defaultAvatar
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

.chat-item .content-image {
  max-width: 100px;
}

.chat-item .content {
  word-break: break-all;
}
</style>
