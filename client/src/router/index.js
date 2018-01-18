import Vue from 'vue'
import Router from 'vue-router'
const TweetList = () => import(/* webpackChunkName: "TweetList" */ '@/components/TweetList')
const SignIn = () => import(/* webpackChunkName: "SignIn" */ '@/components/SignIn')
const SignUp = () => import(/* webpackChunkName: "SignUp" */ '@/components/SignUp')
const EditUser = () => import(/* webpackChunkName: "EditUser" */ '@/components/EditUser')
const ListHashtag = () => import(/* webpackChunkName: "EditUser" */ '@/components/ListHashtag')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TweetList
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/edit/:user',
      name: 'Edit',
      component: EditUser
    },
    {
      path: '/hashtag/:hashtag',
      name: 'Hashtag',
      component: ListHashtag
    }
  ]
})
