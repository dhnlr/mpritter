<template>
  <div class="boom">
    <LoaDer v-if="!allTweet && token"></LoaDer>
    <div class="field is-grouped">
      <textarea class="textarea" placeholder="Post Your Mpritt" v-model="tweet"></textarea>
      <p class="help is-danger" v-if='$vuelidation.error("tweet")'>{{ $vuelidation.error('name') }}</p>
      <p class="control">
        <a class="button edit is-info" :disabled="$vuelidation.errors()" @click="submit" v-if="!isedit">
          Mpritt
        </a>
        <a class="button edit is-warning" :disabled="$vuelidation.errors()" @click="submitEdit" v-if="isedit">
          Edit
        </a>
      </p>
    </div>
    <div class="alllist">
      <div class="columns" v-for="tweet in allTweet" v-if="allTweet">
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
                  <a class="button is-warning" @click="edit(tweet.post, tweet._id)" v-if="ismine(tweet.author._id)">Edit</a>
                  <a class="button is-danger" @click="destroy(tweet._id)" v-if="ismine(tweet.author._id)">Delete</a>
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" v-for="hashtag in tweet.hashtag">
                    <router-link :to="{'name': 'Hashtag', params:{'hashtag': hashtag}}"><span class="tag">{{hashtag}}</span></router-link>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaDer from './LoaDer'

export default {

  name: 'TweetList',
  components: {LoaDer},
  data () {
    return {
      tweet: null,
      tweetId: null,
      isedit: false
    }
  },
  vuelidation: {
    data: {
      tweet: {
        required: true,
        betweenLength: {
          min: 1,
          max: 140
        }
      }
    }
  },
  methods: {
    submit () {
      this.$http.post(`http://localhost:3000/tweet/`, {
        post: this.tweet,
        hashtag: this.hashtag
      }, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.tweet = ' '
          this.$store.dispatch('updateTweet')
        })
    },
    destroy (id) {
      this.$http.delete(`http://localhost:3000/tweet/${id}`, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.dispatch('updateTweet')
        })
    },
    edit (post, id) {
      this.tweet = post
      this.isedit = true
      this.editId = id
    },
    submitEdit () {
      this.$http.put(`http://localhost:3000/tweet/${this.editId}`, {
        post: this.tweet,
        hashtag: this.hashtag
      }, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.tweet = ' '
          this.isedit = false
          this.$store.dispatch('updateTweet')
        })
    },
    ismine (id) {
      return (id === this.userId)
    }
  },
  computed: {
    allTweet () {
      return this.$store.state.allTweet
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
    },
    hashtag () {
      let splitTweet = this.tweet.split(' ')
      return splitTweet.filter(words => words[0] === '#')
    }
  },
  created () {
    if (!this.token) {
      this.$router.push({'name': 'Signin'})
    }
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
  .alllist{
    padding-top: 2em;
  }
  .edit{
    height: 100%;
    margin-left: 5px;
  }
</style>