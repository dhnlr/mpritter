const mutations = {
  updateToken ({state}) {
    this.state.token = localStorage.token
  },
  updateUserId ({state}) {
    this.state.userId = localStorage.userId
  },
  updateUsername ({state}) {
    this.state.username = localStorage.username
  },
  updateUserPhoto ({state}) {
    this.state.photo = localStorage.photo
  },
  updateUserEmail ({state}) {
    this.state.email = localStorage.email
  }
}

export default mutations
