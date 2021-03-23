<template>
  <div class="container chatroom bg-info">
    <div class="header row bg-primary">
      <h4 class="col-xs-12 title">
        Mini Chatroom
        <small class="count">{{ onlineCount }} people online</small>
      </h4>
    </div>
    <ChatGroup>
      <ChatItem
        v-for="(chat, index) in chats"
        :key="index"
        :avatar="chat.avatar"
        :tag="chat.tag"
        :name="chat.name"
        :time="chat.time"
        :content="chat.content"
        :footer="chat.footer"
      />
    </ChatGroup>
    <div class="footer row">
      <div class="col-xs-9">
        <input
          v-model="message"
          autofocus
          @keyup.enter="sendMessage"
          @input="onMessageInput"
          class="form-control"
          label="chat-input"
          name="chat-input"
        />
      </div>
      <div class="col-xs-3 text-right">
        <button
          type="button"
          @click="sendMessage"
          class="form-control btn btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import io from "socket.io-client"
import moment from "moment"
import { useStore } from "vuex"
import { defineComponent, onMounted, ref } from "@vue/runtime-core"
import ChatGroup from '../components/ChatGroup.vue'
import ChatItem from '../components/ChatItem.vue'
import { SOCKET_URL } from '../common/api-list'
import { SOUGOU_IMG_REG, TIME_FORMAT, WS_EVENT } from "../common/constants"
import { parseName, parseFooter } from '../common/helper'
import { ChatroomActionType } from "../store/chatroom"

const Chatroom = defineComponent({
  components: {
    ChatGroup,
    ChatItem
  },
  directives: {

  },
  setup() {
    const store = useStore()
    const message = ref('')
    const chats = ref([{}])
    const onlineCount = ref(0)
    chats.value = []
    const socket = io(SOCKET_URL, {
      path: '/socket'
    })
    const sendMessage = () => {
      if (message.value.length === 0) {
        return false
      }
      const data = {
        avatar: '',
        time: Date.now(),
        platform: navigator.platform,
        network: (navigator as any).connection.effectiveType,
        userAgent: navigator.userAgent,
        content: message.value
      }
      message.value = ''
      socket.emit(WS_EVENT.SEND_CHAT, data)
    }
    const onMessageInput = () => {
      return SOUGOU_IMG_REG.test(message.value) && sendMessage()
    }
    const registerWS = () => {
      socket.on(WS_EVENT.RECEIVE_CHAT, (res: any) => {
        const chat = {
          avatar: res.avatar,
          tag: res.tag,
          name: parseName(res.ip, res.tag),
          time: moment(res.time).format(TIME_FORMAT),
          content: res.content,
          footer: parseFooter(res.userAgent)
        }
        chats.value.push(chat)
      })
      socket.on(WS_EVENT.INIT, function (res: any) {
        onlineCount.value = res.count
        store.dispatch(ChatroomActionType.UpdateCurrentTag, res.tag);
        document.title = 'Mini Chatroom(' + res.tag + ')'
      })
      socket.on(WS_EVENT.ALWAYS_PUSH, function (res: any) {
        onlineCount.value = res.count
      })
    }
    onMounted(registerWS)

    return {
      chats,
      onlineCount,
      message,
      sendMessage,
      onMessageInput
    }
  }
})
export default Chatroom
</script>
<style lang="scss" scoped>
.chatroom {
  max-height: 100%;
  height: 100%;
  position: relative;
}

.title {
  margin: 0 !important;
  padding: 15px;
}

.footer {
  position: absolute;
  bottom: 15px;
  width: 100%;
}

.p-0 {
  padding: 0;
}

.btn {
  text-align: center;
  padding: 0;
}

.count {
  color: yellow;
}
</style>
