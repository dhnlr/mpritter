<template>
  <div id="app">
    <header>
      <NavBar></NavBar>
    </header>
    <main>
      <div class="columns">
        <div class="column is-three-fifths is-offset-one-fifth">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'app',
  components: {NavBar},
  created () {
    this.$store.dispatch('updateTweet')
    this.$store.commit('updateToken')
    this.$store.commit('updateUserId')
    this.$store.commit('updateUsername')
    this.$store.commit('updateUserPhoto')
    this.$store.commit('updateUserEmail')
  }
}
</script>

<style>
</style>
