<template>
  <div class="login container bg-info full-height">
    <h3>Mini Chatroom</h3>
    <form action="javascript:;">
      <div class="form-group">
        <label for="usernameInput">username</label>
        <input class="form-control" id="usernameInput" v-model="username" />
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
import { useStore } from 'vuex'
import { IRequestPayload } from '../common/constants'
import { AuthenticationActionType, IAuthenticationReqSchema } from '../store/authentication'

const Login = defineComponent({
  setup() {
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const remember = ref(false)
    const submit = async () => {
      const payload: IRequestPayload<IAuthenticationReqSchema> = {
        meta: {
          needToast: true
        },
        body: {
          username: username.value,
          password: password.value,
          remember: remember.value
        }
      }
      try {
        await store.dispatch(AuthenticationActionType.Authentication, payload)
      } catch (error) {

      }
    }
    return {
      username,
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
