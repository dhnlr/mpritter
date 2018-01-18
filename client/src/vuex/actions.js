import * as axios from 'axios'

const actions = {
  updateTweet ({state}) {
    axios.get(`http://localhost:3000/tweet`, {headers:
      {token: localStorage.token}})
      .then(resp => {
        state.allTweet = resp.data.data
      })
  },
  updateHashtag ({state}, payload) {
    axios.post(`http://localhost:3000/tweet/search`, {
      hashtag: payload.hashtag
    }, {headers:
      {token: localStorage.token}})
      .then(resp => {
        console.log(resp)
        state.hashTag = resp.data.data
      })
  }
}

export default actions
