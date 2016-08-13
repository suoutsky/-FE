<template>
  <div>
    <Headimg></Headimg>
    <div class="notes-box">
    <Noticebar></Noticebar>
    </div>
  </div>
  <div class="box">
    <div class="disc"><img src="../../static/disc.gif" style="width:100%;height:100%;"></div>
    <div class="arrow"><img src="../../static/arrow.png" style="width:100%;height:100%"></div>
    <a class="btn" v-on:click="showCaptcha" href="javascript:;"><img src="../../static/btn.png" style="width:100%;height:100%;"></a>
  </div>
  <alert :show.sync="alertShow" title="提示" button-text="确定">
    <p style="text-align:center;">{{alertMsg}}<img width="100%" src="https://gcodex.alicdn.com/web/doTransit.do?url=http%3A%2F%2Fm.laiwang.com%2Fmarket%2Flaiwang%2Ftmall%2Fapp-download.php%3Fmmstat%3Dmbar_detail%26type%3Ddetail%26key%3D533178008487"></p>
  </alert>
  <loading :show="loadingShow" :text="loadingText">
  </loading>
  <div id="dialog_share_main" class="dialog dialog_share_main" style="display: none;">
    <div class="share_arrow"></div>
    <div class="point-content"></div>
  </div>
</template>
<script>
import { Alert, Loading } from 'vux-components'
import noticebar from '../components/noticebar'
import Headimg from '../components/headimg'
import wx from 'weixin-js-sdk'
let host = 'http://localhost:3000'
let headers = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  emulateJSON: true
}
export default {
  components: {
    noticebar,
    Alert,
    Loading,
    Headimg
  },
  data () {
    return {
      list: [],
      lat: '30',
      lng: '120',
      alertShow: false,
      alertMsg: ''
    }
  },
  ready () {
    var h = document.documentElement.clientWidth
    var e = 10 * (h / 320)
    document.documentElement.style.fontSize = e + 'px'
  },
  methods: {
    showCaptcha: function () {
      setTimeout(this.goCrash(), 2000)
    },
    clearArrow: function () {
      var oBox = document.querySelectorAll('.box')[0]
      var arrow = oBox.querySelectorAll('.arrow')[0]
      arrow.style.display = 'none'
    },
    goCrash () {
      // 抽奖
      this.getLocation()
      this.loadingShow = true
      let data = {
        lng: this.lng,
        lat: this.lat
      }
      console.log('发送请求的数据' + JSON.stringify(data))
      this.$http.post('' + host + '/cuteBaby/crash', data, headers).then((response) => {
        this.loadingShow = false
        if (response.data.state === 1000) {
          setTimeout(this.clearArrow(), 2000)
          setTimeout(this.alertMsg = '恭喜你中奖了,奖品已发放，请到微信首页查看', 3000)
        } else if (response.data.state === 1300) {
          setTimeout(this.clearArrow(), 2000)
          setTimeout(this.alertMsg = '您已经参与过抽奖，感谢对本活动的支持', 3000)
        } else if (response.data.state === 1400) {
          document.getElementById('dialog_share_main').style.display = 'block'
        } else if (response.data.state === 1500) {
          setTimeout(this.alertMsg = '您还没有资格抽奖，快去投票吧!', 3000)
        } else {
          setTimeout(this.clearArrow(), 2000)
          console.log('抽奖失败!', response.data.message, response.data.state)
          this.alertShow = true
          setTimeout(this.alertMsg = '系统错误－抽奖失败', 4000)
        }
      })
    },
    getWx () {
      // 获取微信授权
      let currUrl = window.location.href
      this.$http.jsonp('http://www.hzchengchao.com/oauth/signpackage?url=' + encodeURIComponent(currUrl), headers).then((response) => {
        console.log(response)
        wx.config({
          debug: true,
          appId: response.data.appid,
          timestamp: response.data.timestamp,
          nonceStr: response.data.nonceStr,
          signature: response.data.signature,
          jsApiList: [
            'checkJsApi', 'openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'uploadImage', 'chooseImage'
          ]
        })
      })
    },
    getLocation () {
      // 获取地理位置
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          this.lat = res.latitude
          this.lng = res.longitude
          console.log('经纬度' + this.lat)
        },
        error: function (res) {
          console.log(res)
        }
      })
    }
  }
}
wx.ready(function () {
  wx.hideMenuItems({
    menuList: [
      'menuItem:exposeArticle',
      'menuItem:setFont',
      'menuItem:dayMode',
      'menuItem:nightMode',
      'menuItem:refresh',
      'menuItem:profile',
      'menuItem:addContact',
      'menuItem:share:qq',
      'menuItem:share:weiboApp',
      'menuItem:favorite',
      'menuItem:share:facebook',
      'menuItem:share:QZone',
      'menuItem:jsDebug',
      'menuItem:editTag',
      'menuItem:delete',
      'menuItem:copyUrl',
      'menuItem:originPage',
      'menuItem:readMode',
      'menuItem:openWithQQBrowser',
      'menuItem:openWithSafari',
      'menuItem:share:email',
      'menuItem:share:brand'
    ]
  })
})
window.onload = function () {
  changeDivHeight()
}
// 当浏览器窗口大小改变时，设置显示内容的高度
window.onresize = function () {
  changeDivHeight()
}
function changeDivHeight () {
  var h = document.documentElement.clientWidth
  var e = 10 * (h / 320)
  document.documentElement.style.fontSize = e + 'px'
}
window.onload = function () {
  var oBox = document.querySelectorAll('.box')[0]
  var oDisc = oBox.querySelectorAll('.disc')[0]
  var oBtn = oBox.querySelectorAll('.btn')[0]
  var data = [
    {id: 1000, goods: '', chance: 10},
		{id: 2000, goods: '', chance: 20},
		{id: 1009, goods: '', chance: 0},
		{id: 1020, goods: '', chance: 50},
		{id: 2008, goods: '', chance: 0},
		{id: 5550, goods: '', chance: 20},
		{id: 888888, goods: '', chance: 0}
  ]
  oBtn.onclick = function () {
    if (oDisc.style.transform) {
      return
    } else {
      dial(oDisc, data, function (obj) {
      })
    }
  }
}
function dial (obj, data, fn) {
  var ang = Math.round(360 / data.length)
  var award = lottery(data)
  var r = (360 - ang * award.idx) - ang / 2 + 3600
  obj.style.transform = 'rotate(' + r + 'deg)'
}

function lottery (data) {
  var arr = []
  var idx = 0
  for (let i in data) {
    data[i].idx = idx++
    data[i].count = data[i].chance
  }
  for (let i in data) {
    while (data[i].count--) {
      arr.push(data[i].id)
    }
  }
  arr = arr.sort(function () {
    return 0.5 - Math.random()
  })
  var id = arr[rnd([arr.length - 1])]
  for (var i in data) {
    if (data[i].id === id) {
      return data[i]
    }
  }
  return false
}
function rnd (under, over) {
  switch (arguments.length) {
    case 1: return parseInt(Math.random() * under + 1)
    case 2: return parseInt(Math.random() * (over - under + 1) + under)
    default: return
  }
}
</script>
<style scoped>
  .notes-box{
    margin-top:1rem;
  }
  .box { position:absolute; left:50%; top:63%; margin-left:-9rem; margin-top:-9rem; width:18rem; height:18rem;}
  .box .disc { position:absolute; left:50%; top:50%; margin-left:-12rem; margin-top:-12rem; width:24rem; height:24rem; -webkit-transition:3s all ease; }
  .box .arrow { position:absolute; left:50%; top:50%; margin-left:-1rem; margin-top:-9rem; width:2rem; height:10rem; }
  .box .btn { position:absolute; width:6rem; height:6rem; left:50%; top:50%; display:block;margin-left:-3rem; margin-top:-3rem;overflow: hidden;}
  /*.box .btn:hover { background-position:-5rem 0; }*/
  #dialog_share_main {
    position: fixed;
    display: inline-block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 999;
  }

  #dialog_share_main .share_arrow {
    background: url("http://7xqomp.com2.z0.glb.qiniucdn.com/hz%2Fimages%2Fshare_arrow.png") no-repeat;
    background-size: 60% 60%;
    position: absolute;
    display: inline-block;
    left: 70%;
    top: 20px;
    width: 30%;
    height: 120px;
  }

  #dialog_share_main .point-content {
    background: url("http://7xqomp.com2.z0.glb.qiniucdn.com/hz%2Fimages%2Fpoint-content.png") no-repeat;
    background-size: 80% 80%;
    position: absolute;
    display: inline-block;
    left: 18%;
    top: 147px;
    width: 82%;
    height: 220px;
  }
</style>
