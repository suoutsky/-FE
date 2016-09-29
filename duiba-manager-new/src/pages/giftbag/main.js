import '../../styles/main.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueValidator from 'vue-validator';
import cookie from 'cookie';
import App from './App';
import initComponents from './initComponents';

Vue.use(VueRouter);
Vue.use(VueValidator);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
let cookies = cookie.parse(document.cookie);
Vue.http.headers.common['csrfToken'] = cookies.csrfToken;
initComponents(Vue);

const AppContainer = Vue.extend(App);
const router = new VueRouter();

router.map({
  // 添加游戏
  '/giftbag': {
    component: function(resolve) {
      require(['./pages/GiftBag.vue'], resolve);
    }
  }
});

router.redirect({
  '*': '/giftbag'
});

router.start(AppContainer, '#app-container');
