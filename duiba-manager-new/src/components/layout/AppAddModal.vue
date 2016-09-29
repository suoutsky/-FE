<template>
  <modal :title="title" :show.sync="show" width="700" class="addapp-modal">
    <template slot="modal-body">
      <div class="modal-body">
        <div class="row-items">
          <li>
            <div class="img1"></div>
            <h1>积分商城</h1>
            <p class="desc">
              完善的积分商城管理系统，让你的积分运营更佳轻松
            </p>
            <a class="btn btn-green" :href="mallHref" @click="close">选择</a>
          </li>
          <li>
            <div class="img2"></div>
            <h1>活动工具</h1>
            <p class="desc">海量的活动工具模板，让你的活动运营更佳出彩</p>
            <a class="btn btn-green" :href="toolHref" @click="close">选择</a>
          </li>
        </div>
      </div>
    </template>
    <template slot="modal-footer">
      <div class="modal-footer"></div>
    </template>
  </modal>
</template>

<script>
import coerceBoolean from 'components/utils/coerceBoolean.js';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true,
      coerce: coerceBoolean,
      default: false
    }
  },
  data() {
    return {
      mallHref: '/addApp?appId=' + duiba.appId,
      toolHref: '/addApp?appId=' + duiba.appId + '#addApp/activitytool'
    };
  },
  methods: {
    close: function() {
      this.show = false;
    }
  }
};
</script>

<style lang="less">
  .addapp-modal{
    .img1,.img2{
      width: 250px;
      height: 200px;
      margin: 0 auto 10px auto;
    }
    .img1{
      background-image: url(../../assets/images/addapp_mall.png);
    }
    .img2{
      background-image: url(../../assets/images/addapp_tool.png);
    }
    h1{
      font-size: 18px;
      color: #444;
      font-weight: normal;
    }
    .desc{
      width:210px;
      margin: 10px auto 20px auto;
      text-align: left;
      font-size: 12px;
      color:#888888;
      line-height:20px;
    }
    .btn{
      width:120px;
      height:32px;
      line-height:32px;
    }
  }
</style>
