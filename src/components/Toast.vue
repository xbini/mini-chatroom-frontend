<template>
  <p v-show="show" :class="type">{{ message }}</p>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { AppState } from '../store'

const Toast = defineComponent({
  name: 'Toast',
  setup() {
    const store = useStore<AppState>()
    const type = computed(() => store.state.toast.type && `bg-${store.state.toast.type}`)
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
