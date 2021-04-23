<template>
  <div class="progress" v-show="disapear">
    <div class="progress-bar" :style="'width:' + width + '%'"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch, onUnmounted, Ref } from "vue"
import { useStore } from "vuex"
import { AppState } from "../store"

const go = (width: Ref<number>, max: number, cb?: Function) => {
  return function draw() {
    width.value+=5
    width.value < max ? window.requestAnimationFrame(draw) : cb && cb()
  }
}

const Spinner = defineComponent({
  name: 'Spinner',
  setup() {
    const width = ref(0)
    const disapear = ref(false)
    const store = useStore<AppState>()
    const show = computed(() => store.state.spinner.show)

    const start = () => {
      if (disapear.value) {
        return
      }
      disapear.value = true;
      width.value = 0;
      go(width, 90)();
    }
    const finish = () => {
      go(width, 100, () => setTimeout(() => disapear.value = false, 500))()
    }

    const execute = new Map()
    execute.set(true, start)
    execute.set(false, finish)
    watch(show, (newVal: boolean) => {
      execute.get(newVal)()
    })

    return {
      disapear,
      width
    }
  }
})
export default Spinner
</script>
<style lang="scss" scoped>
.progress {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0;
  border-radius: 0;
  background-color: transparent;
  height: 4px;
}
</style>
