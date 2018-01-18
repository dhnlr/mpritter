<template>
  <div>
    <h1 class="title">Signin</h1>
    <article class="message is-danger">
      <div class="message-body" v-if="warning">
        {{warning}}
      </div>
    </article>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="text" placeholder="User username" v-model="username" :disabled="isprocess">
      </div>
      <p class="help is-danger" v-if='$vuelidation.error("username")'>{{ $vuelidation.error('username') }}</p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="User password" v-model="password" :disabled="isprocess">
      </div>
      <p class="help is-danger" v-if='$vuelidation.error("password")'>{{ $vuelidation.error('password') }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :disabled="isprocess || $vuelidation.errors()" @click="signin">Submit</button>
      </div>
      <div class="control">
        <button class="button is-text" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'LogIn',

  data () {
    return {
      username: '',
      password: '',
      warning: null,
      isprocess: false
    }
  },
  vuelidation: {
    data: {
      username: {
        required: true,
        alphabetic: true
      },
      password: {
        required: true
      }
    }
  },
  methods: {
    reset () {
      this.username = ''
      this.password = ''
    },
    signin () {
      if (!this.$vuelidation.errors()) {
        this.$http.post(`http://localhost:3000/users/signin`, {
          username: this.username,
          password: this.password
        })
          .then(resp => {
            localStorage.token = resp.data.token
            localStorage.userId = resp.data.userId
            localStorage.username = resp.data.username
            localStorage.photo = resp.data.photo
            localStorage.email = resp.data.email
            this.$store.commit('updateToken')
            this.$store.commit('updateUserId')
            this.$store.commit('updateUsername')
            this.$store.commit('updateUserPhoto')
            this.$store.commit('updateUserEmail')
            this.reset()
            this.$router.push({'name': 'Home'})
          })
          .catch(error => {
            this.reset()
            this.warning = error.response.data.error.message
          })
      }
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  created () {
    if (this.token) {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>