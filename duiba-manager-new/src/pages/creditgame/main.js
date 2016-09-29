import '../../styles/main.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueValidator from 'vue-validator';
import Sortable from 'vue-sortable';
import cookie from 'cookie';
import App from './App';
import initComponents from './initComponents';

Vue.use(VueRouter);
Vue.use(VueValidator);
Vue.use(VueResource);
Vue.use(Sortable);
Vue.http.options.emulateJSON = true;
let cookies = cookie.parse(document.cookie);
Vue.http.headers.common['csrfToken'] = cookies.csrfToken;
initComponents(Vue);

const AppContainer = Vue.extend(App);
const router = new VueRouter();

router.map({
  // 添加游戏
  '/creditgame': {
    component: function(resolve) {
      require(['./pages/CreditGame.vue'], resolve);
    },
    subRoutes: {
      // 添加游戏
      '/': {
        component: function(resolve) {
          require(['./pages/AddCreditGame.vue'], resolve);
        }
      },
      // 编辑游戏
      '/:id': {
        component: function(resolve) {
          require(['./pages/AddCreditGame.vue'], resolve);
        }
      },
      // 拷贝游戏
      '/copy/:id': {
        component: function(resolve) {
          require(['./pages/AddCreditGame.vue'], resolve);
        }
      }
    }
  }
});

router.redirect({
  '*': '/creditgame'
});

router.start(AppContainer, '#app-container');
