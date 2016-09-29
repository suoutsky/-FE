<template>
  <modal class="activity-modal" :show.sync="show" width="480">
    <template slot="title">
      <i class="iconhandle">&#xe60f;</i>
      您已成功参加活动
    </template>
    <template slot="modal-body">
      <div class="modal-body">
        <div class="form-group">
          <label class="control-label">马上开启活动：</label>
          <div :class="{ 'bottom-tri-line': activityOn }">
            <div class="cf">
              <dswitch :status.sync="activityOn"></dswitch>
            </div>
          </div>
          <div class="activity-banner" v-show="activityOn">
            <h4>将为您配置banner区入口：</h4>
            <img :src="activityBanner">
            <p>如想调整入口的图片与位置，请到“页面内容设置”栏目调整。</p>
          </div>
        </div>
      </div>
    </template>
    <template slot="modal-footer">
      <div class="modal-footer">
        <a href="javascript:void(0)" class="btn btn-green btn-lg" @click="save">保存配置</a>
      </div>
    </template>
  </modal>
</template>

<script>
import dswitch from 'components/basic/DSwitch';
import coerceBoolean from 'components/utils/coerceBoolean.js';

export default {
  components: {
    dswitch
  },

  props: {
    show: {
      type: Boolean,
      coerce: coerceBoolean,
      required: true,
      default: false
    },
    activityOn: {
      type: Boolean,
      default: true,
      twoWay: true
    },
    activityBanner: {
      type: String,
      default: ''
    },
    save: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="less">
.activity-modal {
  .modal-title {
    text-align: center;
    line-height: 28px;
    padding-bottom: 20px;
    border-bottom: 2px solid #F6F6F6;

    .iconhandle {
      font-size: 28px;
      color: #59dfa3;
      margin-right: 10px;
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
  }

  .form-group {
    padding: 0;
    padding-left: 110px;
    margin-bottom: 0;
  }

  .control-label {
    width: 100px;
    font-weight: normal;
  }

  .form-switch {
    padding: 5px 0 15px;
    border-bottom: 1px solid #e1e1e1;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -1px;
    }

    &:before {
      border: 6px solid transparent;
      border-bottom-color: #e1e1e1;
      left: 15px;
    }

    &:after {
      border: 5px solid transparent;
      border-bottom-color: #fff;
      left: 16px;
    }
  }

  .activity-banner {
    padding: 15px 0 0;

    h4 {
      font-size: 14px;
      color: #444;
      font-weight: normal;
    }

    p {
      font-size: 12px;
      color: #888;
    }

    img {
      display: block;
      width: 183px;
      height: auto;
      padding: 3px;
      border: 1px solid #e1e1e1;
      margin: 10px 0;
    }
  }

  .modal-body {
    padding-bottom: 10px;
  }

  .modal-footer {
    text-align: center;
  }
}
</style>
