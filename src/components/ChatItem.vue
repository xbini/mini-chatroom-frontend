<template>
  <div class="clearfix chat-item">
    <img class="avatar pull-left" src="{avatar}" alt="avatar" />
    <div class="info">
      <div>
        <strong class="text-primary {selfClass}">{name}</strong>
        <small class="text-muted">{time}</small>
      </div>
      <div class="content">{content}</div>
      <div class="text-right">
        <small>from <span class="text-danger">{footer}</span></small>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

let avatar = ''
function generateAvatar() {
  const tag = parseInt(String(Math.random() * 10000000), 10);
  return 'https://avatars.githubusercontent.com/u/' + tag + '?s=60&v=4';
}

const ChatItem = defineComponent({
  props: {
    avatar: {
      type: String,
      default: generateAvatar()
    },
    time: {
      type: Number
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
