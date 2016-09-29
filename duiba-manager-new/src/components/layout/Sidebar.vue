<template>
  <aside id="app-sidebar">
    <topbar></topbar>
    <nav class="sidebar-nav">
      <ul>
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
    </nav>
    <Bottombar v-bind:type="type" v-bind:hide.sync="botBarHide"></Bottombar>
  </aside>
  <a :href="goback" class="goback" :class="{ 'hideback' : hideback }" @mouseenter="gobackShow" @mouseleave="gobackHide">
    <div class="cloud1"></div>
    <div class="cloud2"></div>
    <div class="cloud3"></div>
    <div class="fly"></div>
    <div class="text"></div>
  </a>
</template>

<script>
import Bottombar from './Bottombar';
import topbar from './Topbar';

export default {
  props: ['type'],
  components: {
    Bottombar,
    topbar
  },
  ready: function() {
    this.timeOut = setTimeout(() => {
      this.hideback = true;
    }, 5000);
  },
  methods: {
    gobackShow: function() {
      clearTimeout(this.timeOut);
      this.hideback = false;
    },
    gobackHide: function() {
      let self = this;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        self.hideback = true;
      }, 5000);
    }
  },
  data() {
    return {
      botBarHide: true,
      timeOut: null,
      hideback: false,
      goback: duiba.goback,
      navList: [
        {
          title: '界面',
          id: 'mobileui',
          icon: '&#xe602;',
          href: 'mobileui?appId=' + duiba.appId
        },
        {
          title: '商品',
          id: 'goods',
          icon: '&#xe603;',
          href: 'goods?appId=' + duiba.appId
        },
        {
          title: '活动',
          id: 'activity',
          icon: '&#xe60c;',
          href: 'activity?appId=' + duiba.appId
        },
        {
          title: '集市',
          id: 'market',
          icon: '&#xe60b;',
          href: 'market?appId=' + duiba.appId
        },
        {
          title: '订单',
          id: 'orders',
          icon: '&#xe600;',
          href: 'orders?appId=' + duiba.appId
        },
        {
          title: '数据',
          id: 'datacenter',
          icon: '&#xe605;',
          href: 'datacenter?appId=' + duiba.appId
        },
        {
          title: '配置',
          id: 'setting',
          icon: '&#xe604;',
          href: 'setting?appId=' + duiba.appId
        }
      ]
    };
  }
};
</script>

<style lang="less">
#app-sidebar {
  width: 80px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  background-color: #333;
  z-index: 99;

  .iconnav {
    font-size: 20px;
    display: block;
    padding: 12px 0 6px 0;
  }
}

.nav-link {
  display: block;
  color: #fff;
  height: 60px;
  text-align: center;
  font-size: 12px;
  opacity: .6;

  &:hover {
    background: rgba(92, 92, 92, 0.2);
    opacity: 1;
  }

  &.active {
    background-color: #5c5c5c;
    color: #fff;
    opacity: 1;
  }
}
.goback {
  position: fixed;
  width: 168px;
  right: 10px;
  bottom: 20px;
  overflow: hidden;
  z-index: 999;
  height: 60px;
  transition: all 0.5s ease-out;
  .cloud1 {
    background: url('../../assets/images/fly.png');
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    background-position: -8px 0;
    position: absolute;
    top: 0;
    left: 0;
    animation: 8s move1 infinite linear;

  }
  .cloud2 {
    background: url('../../assets/images/fly.png');
    width: 16px;
    height: 10px;
    background-position: -47px 0;
    background-repeat: no-repeat;
    position: absolute;
    top: 13px;
    left: 120px;
    animation: 8s move2 infinite linear;
  }
  .cloud3 {
    background: url('../../assets/images/fly.png');
    width: 25px;
    height: 16px;
    background-position: -10px -84px;
    background-repeat: no-repeat;
    position: absolute;
    top: 42px;
    left: 67px;
    animation: 8s move3 infinite linear;
  }
  .fly {
    background: url('../../assets/images/fly.png');
    width: 63px;
    height: 36px;
    background-position: 0px -36px;
    background-repeat: no-repeat;
    position: absolute;
    top: 15px;
    left: 20px;
    animation: plane-move 2s infinite ease-in-out;
  }
  .text {
    background: url('../../assets/images/fly.png');
    width: 82px;
    height: 28px;
    background-position: 0 -114px;
    background-repeat: no-repeat;
    position: absolute;
    top: 18px;
    right: 9px;
    animation: plane-move 2s infinite ease-in-out;
  }
}
.hideback {
  right: -100px;
}
@keyframes plane-move{
  0% {
    transform: translateY(-5px);
    opacity: 0.9;
  }
  50% {
    transform: translateY(5px);
    opacity: 9;
  }
  100% {
    transform: translateY(-5px);
    opacity: 0.9;
  }
}
@keyframes move1 {
  0% {opacity: 1;   left: 0;  }
  10% {  opacity: 1;  left: 20px;  }
  20% {  opacity: 1;  left: 40px;  }
  30% {  opacity: 1;  left: 60px;  }
  40% {  opacity: 1;  left: 80px;  }
  50% {  opacity: 1;  left: 100px;  }
  60% {  opacity: 1;  left: 120px;  }
  70% {  opacity: 1;  left: 140px;  }
  80% {  opacity: 0;  left: 170px;  }
  100% {opacity: 0; left: -20px;  }
}
@keyframes move2 {
  0% {opacity: 1;   left: 120px;  }
  10% {  opacity: 1;  left: 140px;  }
  20% {  opacity: 1;  left: 160px;  }
  30% {  opacity: 0;  left: 170px;  }
  40% {  opacity: 0;  left: 20px;  }
  50% {  opacity: 1;  left: 40px;  }
  60% {  opacity: 1;  left: 60px;  }
  70% {  opacity: 1;  left: 80px;  }
  80% {  opacity: 1;  left: 100px;  }
  100% {opacity: 1; left: 120px;  }
}
@keyframes move3 {
  0% {opacity: 1;   left: 68px;  }
  10% {  opacity: 1;  left: 88px;  }
  20% {  opacity: 1;  left: 100px;  }
  30% {  opacity: 1;  left: 120px;  }
  40% {  opacity: 1;  left: 140px;  }
  50% {  opacity: 1;  left: 160px;  }
  60% {  opacity: 0;  left: 170px;  }
  70% {  opacity: 0;  left: 20px;  }
  80% {  opacity: 1;  left: 48px;  }
  100% {opacity: 1; left: 68px;  }
}
@keyframes textkey {
  25%{
    -webkit-transform:translate(0);
    -moz-transform:translate(0);
    transform:translate(0);
  }
  50%{
    -webkit-transform:translate(0,-10px);
    -moz-transform:translate(0,-10px);
    transform:translate(0,-10px);
  }
  75%{
    -webkit-transform:translate(15px,0);
    -moz-transform:translate(15px,0);
    transform:translate(15px,0);
  }
}
</style>