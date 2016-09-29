<template>
  <div class="sidebar-topbar" :class="{active: showDropDown, 'applist-2-col': applist.length > 4 }">
    <div class="btn-open" @click="toggleDropDownList">
        <img :src="appLogo" v-if="appLogo" class="logo">
        <img v-else src="../../assets/images/default_appicon.png" class="logo">
      <span class="appname">{{appName}}</span>
      <i class="iconhandle icon-fold"></i>
    </div>
    <div class="dropdown-list" v-if="showDropDown">
      <ul class="app-list" v-if="applist && applist.length !== 0">
        <li v-for="item in applist" v-if="$index < 10 && parseInt(item.app.id) !== parseInt(appId)">
          <a :href="'/redirectApp?appId='+ item.app.id">
            <img v-if="item.app.logo" :src="item.app.logo">
            <img v-else src="../../assets/images/default_appicon.png">
            <span>{{item.app.name}}</span>
          </a>
        </li>
      </ul>
      <div class="btn-add-app" @click="openAddAppModal" :class="{disabled: applist.length > 9}">
        <template v-if="applist.length < 10">
          <i class="iconhandle icon-add">&#xe61b;</i>
          <span>添加应用</span>
        </template>
        <template v-else>
          <div @mouseenter="btnMouseEnter" @mouseleave="btnMouseLeave">
            <template v-if="isBtnMouseEnter">
              <span>共10个应用，最多可添加10个应用</span>
            </template>
            <template v-else>
              <i class="iconhandle icon-add">&#xe61b;</i>
              <span>添加应用</span>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
  <appaddmodal :show.sync="showAddAppModal"></appaddmodal>
</template>

<script>
import EventListener from '../utils/EventListener';
import appaddmodal from './AppAddModal';

export default {
  components: {
    appaddmodal
  },
  ready: function() {
    this.getAppList();
  },
  data() {
    return {
      showDropDown: false,
      showAddAppModal: false,
      isBtnMouseEnter: false,
      applist: '',
      appId: duiba.appId,
      appLogo: '',
      appName: ''
    };
  },
  methods: {
    toggleDropDownList: function(e) {
      e.stopPropagation();
      let self = this;
      let handle = function() {
        self.showDropDown = false;
        EventListener.listen(document, 'click', handle).remove();
      };
      if (self.showDropDown) {
        self.showDropDown = false;
      } else {
        self.showDropDown = true;
        EventListener.listen(document, 'click', handle);
      }
    },
    openAddAppModal: function() {
      if (this.applist.length > 9) return;
      this.showAddAppModal = true;
      this.showDropDown = false;
    },
    getAppList: function() {
      this.$http.post('/developer/index').then((res) => {
        res = res.json();
        if (res.success) {
          let appList = res.data.apps;
          for (let i in appList) {
            let item = appList[i];
            if (parseInt(item.app.id) === parseInt(this.appId)) {
              if (item.app.logo) {
                this.appLogo = item.app.logo;
              }
              this.appName = item.app.name;
            }
          }
          this.$set('applist', res.data.apps);
        }
      }, (res) => {
        // error callback
      });
    },
    btnMouseEnter: function() {
      console.log('enter');
      this.isBtnMouseEnter = true;
    },
    btnMouseLeave: function() {
      console.log('leave');
      this.isBtnMouseEnter = false;
    }
  }
};
</script>

<style lang="less">
.sidebar-topbar{
  background:#272727;
  text-align: left;
  position:relative;
  border-radius: 0 4px 0 0;
  z-index:2;
  .appname{
    padding-left: 62px;
    line-height:60px;
    display:none;
    font-size: 14px;
    color: #FFF;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 60px;
    vertical-align: middle;
  }
  .btn-open{
    cursor:pointer;
    height:60px;
    &:hover{
      .icon-fold{
        opacity:1;
      }
    }
  }
  .icon-fold{
    color: #FFF;
    font-size: 10px;
    position: absolute;
    right:8px;
    top:24px;
    opacity: 0.8;
  }
  .icon-fold:after{
    content:'\e618';
  }
  .logo {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position:absolute;
    left:50%;
    top:50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    -webkit-transition:.2s ease;
    transition:.2s ease;
    -webkit-transition-property:width,height;
    transition-property:width,height;
    &:hover{
      width:34px;
      height:34px;
    }
  }
  &.active{
    width:136px;
    .logo{
      left:40px;
    }
    .appname{
      display:inline-block;
    }
    .icon-fold{
      right:20px;
      &:after{
        content:'\e617';
      }
    }
  }
  &.active.applist-2-col {
    width: 252px;
    .btn-open{
      .appname{
        max-width: 160px;
      }
    }
    .dropdown-list {
      .app-list{
        width:230px;
        li {
          width: 99px;
          display:inline-block;
        }
      }
      .btn-add-app{
        width: 230px;
      }
    }
  }
  .dropdown-list{
    font-size: 12px;
    position:absolute;
    width:100%;
    background:#272727;
    border-radius: 0 0 4px 0;
    padding-bottom: 5px;
    .app-list{
      border-top: 1px solid #333;
      width:115px;
      margin: 0 auto;
      li{
        padding:11px 0px 10px 16px;
        a{
            color:#FFF;
        }
        img{
          width:25px;
          height:25px;
          margin-right: 5px;
          overflow: hidden;
          border-radius: 50%;
          vertical-align: middle;
          &+span{
            display:inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 62px;
            vertical-align: middle;
            opacity:0.5;
            &:hover{
              opacity:1;
            }
          }
        }
      }
    }
    .btn-add-app{
      cursor: pointer;
      border-top: 1px solid #333;
      width:115px;
      margin: 0 auto;
      text-align: center;
      color:#FFF;
      opacity:0.8;
      height:38px;
      line-height: 38px;
      &.disabled {
        color:#444;
      }
      &:hover{
        opacity: 1;
      }
      .icon-add{
        margin-right:5px;
        vertical-align: middle;
        font-size: 18px;
        &+span{
          vertical-align: middle;
        }
      }
    }
  }
}

</style>