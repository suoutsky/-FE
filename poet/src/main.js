import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './views/Home.vue'
import Poet from './views/Poet.vue'
Vue.use(VueRouter)
Vue.use(VueResource)
const router = new VueRouter()
router.map({
  '/home': {
    component: Home
  },
  '/poet': {
    component: Poet
  }
})

/* eslint-disable no-new */
router.redirect({
  '*': '/home'
})

router.start(App, '#app')
