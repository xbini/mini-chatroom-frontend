<template>
  <div class="container chatroom bg-info">
    <div class="header row bg-primary">
      <h4 class="col-xs-12 title">
        Mini Chatroom <small class="count">1 people online</small>
      </h4>
    </div>
    <ChatGroup>
      <ChatItem />
    </ChatGroup>
    <div class="footer row">
      <div class="col-xs-9">
        <input
          v-model="message"
          autofocus
          class="form-control"
          label="chat-input"
          name="chat-input"
        />
      </div>
      <div class="col-xs-3 text-right">
        <button
          type="button"
          @click="send"
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
import { defineComponent } from "@vue/runtime-core"
import ChatGroup from '../components/ChatGroup.vue'
import ChatItem from '../components/ChatItem.vue'
import { SOCKET_URL } from '../common/api-list'

const TIME_FORMAT = 'HH:mm:ss'

const SOUGOU_IMG_REG = /点击\[(.*)\]查看表情/

function parseName(ip: string, tag: string) {
  const name = `${tag}-(${ip})`
  return (name || 'Name').replace('::ffff:', '')
}

function parseFooter(userAgent: any) {
  var result = ''
  var i = userAgent.match(/\(/).index
  var j = userAgent.match(/\)/).index
  result = userAgent.substring(i + 1, j)
  return result || 'unknown'
}

function parseContent(content: string) {
  var result = content
  var matched = content.match(SOUGOU_IMG_REG)
  var url = matched ? matched[1] : undefined
  if (url) {
    result = "<img class='content-image' src='" + url + "'/>"
  }
  return result || 'this is content'
}

const Chatroom = defineComponent({
  components: {
    ChatGroup,
    ChatItem
  },
  data() {
    return {
      message: '',
      timer: -1,
      chats: [],
      socket: io(SOCKET_URL, {
        path: '/socket'
      })
    }
  },
  methods: {
    send() {
      if (this.message.length === 0) {
        return false
      }
      const data = {
        avatar: '',
        time: Date.now(),
        platform: navigator.platform,
        network: (navigator as any).connection.effectiveType,
        userAgent: navigator.userAgent,
        content: this.message
      }
      this.message = ''
      this.socket.emit('send-chat-from-client', data)
    }

  },

  mounted() {
    this.socket.on('receive-chat-from-server', (res: any) => {
      console.log(res)
      clearTimeout(this.timer)
      // timer = setTimeout(function () {
      //   var y = commentList.scrollHeight;
      //   commentList.scrollTo(0, y);
      // }, 20);
      const chat = {
        avatar: res.avatar,
        // selfClass: window.MINI_CHATROOM_TAG === comment.tag ? 'bg-danger' : '',
        name: parseName(res.ip, res.tag),
        time: moment(res.time).format(TIME_FORMAT),
        content: parseContent(res.content),
        footer: parseFooter(res.userAgent)
      }
    })
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
