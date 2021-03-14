<template>
  <div class="comment">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const ChatGroup = defineComponent({
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
