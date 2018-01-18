<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/logo.png" title="MPRITTER" alt="Logo" width="auto" height="28">
          &nbsp;&nbsp;MPRITTER
        </router-link>

        <button class="button navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start" v-if="token">
          <!--  -->
        </div>

        <div class="navbar-end" v-if="token">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;{{username}}
            </a>

            <div class="navbar-dropdown is-right">
              <router-link class="navbar-item" :to="{'name': 'Edit', 'params':{'user': userId}}">
                Edit Profile
              </router-link>
              <a class="navbar-item" @click="signout()">
                Signout
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="!token">
          <div class="navbar-item">
            <router-link :to="{ name: 'Signin'}" class="navbar-item">
              Signin
            </router-link>
          </div>
          <div class="navbar-item">
            <router-link :to="{ name: 'Signup'}" class="navbar-item">
              Signup
            </router-link>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {

  name: 'NavBar',

  data () {
    return {

    }
  },
  methods: {
    signout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      this.$store.commit('updateToken')
      this.$store.commit('updateUserId')
      this.$store.commit('updateUsername')
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userId () {
      return this.$store.state.userId
    },
    username () {
      return this.$store.state.username
    }
  },
  mounted: function () {
    document.addEventListener('DOMContentLoaded', function () {
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target
            var $target = document.getElementById(target)
            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active')
            $target.classList.toggle('is-active')
          })
        })
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>