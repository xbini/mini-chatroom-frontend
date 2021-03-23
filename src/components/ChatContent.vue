<script lang="ts">
import { defineComponent } from 'vue'
import { renderChatContent } from '../common/helper'

const ChatContent = defineComponent({
  name: 'ChatContent',
  props: {
    content: String
  },
  render() {
    return renderChatContent(this.content as string)
  }
})
export default ChatContent
</script>
