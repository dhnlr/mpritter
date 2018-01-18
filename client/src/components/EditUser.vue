<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="Email" v-model="email">
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <figure class="image is-4by3">
          <img :src="image" v-if="image">
          <img :src="this.photoOld" v-if="!image">
        </figure>
      </div>
      <div class="column">
        <div class="field">
          <div class="file is-centered is-warning is-boxed">
            <label class="file-label">
              <input class="file-input" type="file" name="image" :disabled="isprocess" @change="onFileChange">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-cloud-upload"></i>
                </span>
              <span class="file-label">
                  Upload Photo
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <a class="button" @click="submit">Button</a>
  </div>
</template>

<script>
export default {

  name: 'EditUser',

  data () {
    return {
      image: null,
      email: '',
      imagemetada: null
    }
  },
  vuelidation: {
    data: {
      email: {
        required: true,
        email: true
      }
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.imagemetada = files[0]
      this.createImage(files[0])
    },
    createImage (file) {
      // var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    submit () {
      let formdata = new FormData()
      formdata.append('image', this.imagemetada)
      formdata.append('email', this.email)
      this.$http.put(`http://localhost:3000/users/${this.$route.params.user}`, formdata, {headers: {
        token: this.token
      }})
        .then(resp => {
          localStorage.photo = resp.data.data.photo
          this.$store.commit('updateUserPhoto')
          this.$router.push({'name': 'Home'})
        })
    }
  },
  computed: {
    emailOld () {
      return this.$store.state.email
    },
    token () {
      return this.$store.state.token
    },
    photoOld () {
      return this.$store.state.photo
    }
  },
  created () {
    this.email = this.emailOld
    if (!this.token) {
      this.$router.push({'name': 'Signin'})
    }
  }
}
</script>

<style lang="css" scoped>
</style>