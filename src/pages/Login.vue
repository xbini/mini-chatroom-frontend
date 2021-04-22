<template>
  <div class="login container bg-info full-height">
    <h3>Mini Chatroom</h3>
    <form action="javascript:;">
      <div class="form-group">
        <label for="userInput">User</label>
        <input class="form-control" id="userInput" v-model="user" />
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          v-model="password"
        />
      </div>
      <div class="checkbox">
        <label> <input type="checkbox" v-model="remember" />Remember me</label>
      </div>
      <div class="text-right">
        <button type="submit" @click="submit" class="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

const Login = defineComponent({
  setup() {
    const user = ref('')
    const password = ref('')
    const remember = ref(false)
    const submit = () => {
      console.log(user.value, password.value, remember.value)
    }
    return {
      user,
      password,
      remember,
      submit
    }
  }
})
export default Login
</script>

<style lang="scss">
</style>
