<template>
  <div>
   <router-view></router-view>
    <tabbar>
      <tabbar-item :selected="onHome" v-link="{path:'/home'}" @click="getPath('/home')">
        <img slot="icon" :src="homeimg">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="onRank" v-link="{ path:'/poet'}" @click="getPath('/ranklist')">
        <img slot="icon" :src="rankingimg">
        <span slot="label">诗社</span>
      </tabbar-item>
      <tabbar-item :selected="onRule" v-link="{ path:'/rule' }" @click="getPath('/rule')">
        <img slot="icon" :src="ruleimg">
        <span slot="label">诗人</span>
      </tabbar-item>
      <tabbar-item :selected="onPrize" v-link="{ path: '/lottrty' }" @click="getPath('/lottrty')">
        <img  slot="icon" :src="prizeimg" id="vott">
        <span slot="label">诗集</span>
      </tabbar-item>
    </tabbar>
  <!--<input v-show="false" type="text" :msg.sync="gPath" value="{{$route.path | json}}">-->
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux-components'
// import wx from 'weixin-js-sdk'
// let shareUrl = 'http://weixin.wcc.cn/open/index.html'
// let shareTitle = '杭州全民福利，投出你宝贵的一票，壕撒十万元红包，进来就送！人人都有！'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      show: true,
      path: '',
      homeimg: 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_home1.png',
      rankingimg: 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_ranking.png',
      ruleimg: 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_rule.png',
      prizeimg: 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_prize.png',
      onHome: false,
      onRank: false,
      onRule: false,
      onPrize: false,
      wxlat: 0,
      wxlng: 0
    }
  },
  methods: {
    getPath (displayIcon) {
      switch (displayIcon) {
        case '/home':
          this.homeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_home1.png'
          this.rankingimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_ranking.png'
          this.ruleimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_rule.png'
          this.prizeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_prize.png'
          break
        case '/ranklist':
          this.rankingimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_ranking1.png'
          this.ruleimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_rule.png'
          this.prizeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_prize.png'
          this.homeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_home.png'
          break
        case '/rule':
          this.ruleimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_rule1.png'
          this.homeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_home.png'
          this.rankingimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_ranking.png'
          this.prizeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_prize.png'
          break
        case '/lottrty':
          this.prizeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_prize1.png'
          this.homeimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_home.png'
          this.rankingimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_ranking.png'
          this.ruleimg = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_rule.png'
          // document.getElementById('vott').src = 'http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_icon_prize1.png'
          this.onPrize = true
          break
        default :
          // this.show = false
      }
    }
  },
  ready () {
    this.getPath()
  }
}
</script>
<style scoped>
  .weui_tabbar{
    /*position: fixed;*/
    background-image: url(http://o7gs84ger.bkt.clouddn.com/voting/bottomNav_bg.png);
  }

  .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
   color:#4fc08d;
  }
</style>

