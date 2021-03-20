<template>
  <div class="comment" v-auto-scroll="direction">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { AutoScroll } from '../directives/auto-scroll'

const ChatGroup = defineComponent({
  directives: {
    [AutoScroll.name]: AutoScroll.directive
  },
  setup() {
    const direction = "bottom"
    return {
      direction
    }
  }
})
export default ChatGroup
</script>

<style lang="scss" scoped>
.comment {
  overflow: auto;
  scroll-behavior: smooth;
  height: calc(100% - 120px);
  max-height: calc(100% - 120px);
  margin: 10px 0 0 0;
}
</style>
