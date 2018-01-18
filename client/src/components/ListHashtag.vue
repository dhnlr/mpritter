<template>
  <div class="boom">
    <div v-for="tweet in hashtagList">
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
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" v-for="hashtag in tweet.hashtag">
              <span class="tag">{{hashtag}}</span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
  </div>
  </div>
</template>

<script>
export default {

  name: 'ListHashtag',

  data () {
    return {

    }
  },
  computed: {
    pureHashtag () {
      console.log(this.$route.params.hashtag)
      return [this.$route.params.hashtag.split('#')[1]]
    },
    hashtagList () {
      return this.$store.state.hashTag
    },
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
  },
  created () {
    console.log('Masuk')
    console.log(this.$route.params.hashtag)
    this.$store.dispatch('updateHashtag', {hashtag: [this.$route.params.hashtag]})
  }
}
</script>

<style lang="css" scoped>
  .box{
    width: 100%;
    margin: 0.86em 0;
  }
  .boom{
    padding-top: 3em;
  }
</style>