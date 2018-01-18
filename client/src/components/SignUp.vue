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
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="User username" v-model="email" :disabled="isprocess">
      </div>
      <p class="help is-danger" v-if='$vuelidation.error("email")'>{{ $vuelidation.error('email') }}</p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="User password" v-model="password" :disabled="isprocess">
      </div>
      <p class="help is-danger" v-if='$vuelidation.error("password")'>{{ $vuelidation.error('password') }}</p>
    </div>
    <div class="field">
      <label class="label">Verification Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Verification password" v-model="verifpassword" :disabled="isprocess">
      </div>
      <p class="help is-danger" v-if='$vuelidation.error("verifpassword")'>{{ $vuelidation.error('verifpassword') }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :disabled="isprocess || $vuelidation.errors()" @click="signup">Signup</button>
      </div>
      <div class="control">
        <button class="button is-text" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'SignUp',

  data () {
    return {
      username: '',
      email: '',
      password: '',
      verifpassword: '',
      warning: '',
      isprocess: false
    }
  },
  vuelidation: {
    data: {
      username: {
        required: true,
        alphabetic: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      },
      verifpassword: {
        required: true
      }
    }
  },
  methods: {
    reset () {
      this.username = ''
      this.email = ''
      this.verifpassword = ''
      this.password = ''
    },
    signup () {
      if (!this.$vuelidation.errors() && this.password === this.verifpassword) {
        this.$http.post(`http://localhost:3000/users/signup`, {
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(resp => {
            this.reset()
            this.$router.push({'name': 'Signin'})
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
  },
  watch: {
    verifpassword () {
      if (this.verifpassword !== this.password) {
        this.warning = 'Make sure your password same as your verification password'
      } else {
        this.warning = null
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>