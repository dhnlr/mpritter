<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="photo" alt="User Photo">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{username}}</strong>
            <br>
            {{tweet.post}}
          </p>
          <p>
            <a class="button is-danger" @click="edit(tweet._id)">Edit</a>
            <a class="button is-danger" @click="destroy(tweet._id)">Delete</a>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left" v-for="hashtag in tweet.hashtag">
            <a class="level-item">
              <span class="tag">{{hashtag}}</span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
export default {

  name: 'TweetOne',
  props: ['tweet'],
  data () {
    return {

    }
  },
  methods: {
    destroy (id) {
      this.$http.delete(`http://localhost:3000/tweet/${id}`, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.dispatch('updateTweet')
        })
    },
    edit (id) {
      this.$store.disp
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    username () {
      return this.$store.state.username
    },
    userId () {
      return this.$store.state.userId
    },
    photo () {
      return this.$store.state.photo
    }
  }
}
</script>

<style lang="css" scoped>
</style>