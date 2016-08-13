<template>
  <div class="v-sigin">
    <div class="mask">
      <div class="container">
        <p class="title">不是诗人</p>

        <p class="subtitle">一个分享与发现的地方</p>

        <div class="ui left icon input big fluid" style="border-bottom:1px solid #ddd">
          <input class="mobile" type="text" placeholder="手机号" v-model="mobile">
          <i class="user icon"></i>
        </div>
        <div class="ui left icon input big fluid">
          <input class="password" type="password" placeholder="密码" v-model="password">
          <i class="lock icon"></i>
        </div>
        <br>
        <div class="login-box">
        <a class="button " v-on:click='signin(mobile,password)'>登录</a>
        </div>
        <div style="margin-top:5px">
          <a v-link="{path: '/signup'}" style="float:left;color:#fff">注册</a>
          <a v-link="{path: '/forgetPassword'}" style="float:right;color:#fff">忘记密码?</a>
        </div>
        <!--提示-->
        <alert :show.sync="alertShow" title="远方" button="go">
          <p style="text-align:center;">{{alertMsg}}</p>
        </alert>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert } from 'vux-components'
let host = 'http://localhost:3000'
let headers = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  emulateJSON: true
}
export default {
  components: {
    Alert
  },
  data () {
    return {
      mobile: '',
      password: '',
      alertShow: false,
      alertMsg: 'poet'
    }
  },
  methods: {
    signin (password, mobile) {
      console.log('11111+++++++')
      let data = {
        pwd: password,
        mobile: mobile
      }
      this.$http.post('' + host + '/login', data, headers).then((res) => {
        console.log(JSON.stringify(res))
        if (res.data.state === '1000') {
          this.alertShow = true
          this.alertMsg = res.data.msg
        } else {
          this.alertShow = true
          this.alertMsg = res.data.msg
        }
      })
    }
  }
}

</script>
<style>
  body{
    overflow: hidden;
  }
  .v-sigin {
    height: 168vw;
    width: 100%;
    background-image: url(http://o9j321yj2.bkt.clouddn.com/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    color: #FFFFFF

  }
  .button{
    color:#fff ;
  }
  .button:hover {
    color: #fff !important;
  }

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .container {
    width: 86vw;
    text-align: center;
    margin: 0 auto;
    padding-top: 40vw;
  }

  .title {
    font-size: 14vw;
    color: #ffffff;
    margin-bottom: 0;
  }

  .subtitle {
    font-size: 17px;
    color: #ffffff;
    /*font-family: $themeFont*/
    margin-top: 0;
  }

  .mobile {
    border-radius: 4px 4px 0 0 !important;
    border: 0 !important;
    width:100%;
    height:10vw;
  }

  .password {
    border-radius: 0 0 4px 4px !important;
    border: 0 !important;
    width:100%;
    height:10vw;
  }

  a:hover{
    color:#4fc08d !important;
  }
  .login-box{
    width:100%;
    background-color:#4fc08d;
    color:#FFFFFF;
    border-radius: 4px;
    height:10vw;
    line-height:10vw;
  }
  .login-box:hover{
    width:100%;
    background-color:lightgreen;
    color:#FFFFFF;
    border-radius: 4px;
    height:10vw;
    line-height:10vw;
  }
</style>
