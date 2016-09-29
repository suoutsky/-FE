<template>
  <nav class="botbar-nav">
    <a href="javascript:;" class="iconhandle" @click="slideToggle">&#xe61c;</a>
    <ul v-bind:class="{
      'hide': hide
     }">
      <li v-for="item in navList">
        <a v-bind:href="item.href" v-bind:class="{
            'nav-link': true,
            'active': (item.id == type)
          }">
          <i class="iconnav">{{{item.icon}}}</i>
          {{item.title}}
        </a>
      </li>
    </ul>
    <p class="logo"></p>
  </nav>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    hide: {
      require: true,
      type: Boolean,
      coerce: coerceBoolean,
      twoWay: true
    }
  },
  methods: {
    slideToggle() {
      this.hide = !this.hide;
    }
  },
  data() {
    return {
      navList: [
        {
          id: 'account',
          title: '账户',
          icon: '&#xe60a;',
          href: 'account?appId=' + duiba.appId
        },
        {
          title: '退出',
          icon: '&#xe606;',
          href: duiba.logout
        }
      ]
    };
  }
};
</script>

<style lang="less">
.botbar-nav {
  width: 80px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #333;
  .logo {
    background: url('../../assets/images/logo.png');
    width: 24px;
    height: 28px;
    background-size: 24px;
    background-repeat: no-repeat;
    margin: 20px auto;
  }
  .iconhandle {
    background: #272727;
    width: 80px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    display: inline-block;
    color: #fff;
    opacity: 0.2;
    &:hover{
       opacity: 1.0;
     }
  }
  .hide{
    display: none;
  }
}

</style>