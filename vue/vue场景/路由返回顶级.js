import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import Rule from './views/Rule.vue'
import Ranklist from './views/Ranklist.vue'
import Lottrty from './views/Lottrty.vue'
import Tim from './views/Tim'
import Card from './views/Card'
import Center from './views/Center'

/* eslint-disable no-new */
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()  // 常量

// 路由map
router.map({
    '/page/one': {
        component: PageOne,
        subRoutes: {
            '/a': {
                component: PageOneA
            },
            '/b': {
                component: PageOneB
            },
            '/c': {
                component: PageOneC
            }
        }
    },
    '/page/two': {
        component: PageTwo,
        subRoutes: {
            '/a': {
                component: PageTwoA
            },
            '/b': {
                component: PageTwoB
            },
            '/c': {
                component: PageTwoC
            }
        }
    }
})
router.redirect({
'*': '/home'
})

router.start(App, '#app')

//你不管在哪個 Component 下，都可以使用 this.$router.go(路由) 來實行跳轉
//
//假設你在 /page/two/a 下，你就可以用 this.$router.go('/page/one/b') 來跳到PageOneB