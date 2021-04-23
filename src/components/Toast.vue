<template>
  <div v-show="show" :class="type.bg">
    <span :class="type.text">{{ message }}</span>
    <button type="button" class="close ml-4" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { AppState } from '../store'

const Toast = defineComponent({
  name: 'Toast',
  setup() {
    const store = useStore<AppState>()
    const type = computed(() => store.state.toast.type && {
      bg: `bg-${store.state.toast.type}`,
      text: `text-${store.state.toast.type}`
    })
    const message = computed(() => store.state.toast.message)
    const show = computed(() => store.state.toast.show)

    return {
      type,
      message,
      show
    }
  }
})
export default Toast
</script>
<style lang="scss" scoped>
div {
  position: fixed;
  bottom: 10px;
  padding: 8px;
  p {
    margin: 0;
  }
}
</style>
