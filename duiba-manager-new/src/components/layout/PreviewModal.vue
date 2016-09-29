<template>
  <Modal class="preview-modal" :title="title" :on-close="onClose" :show.sync="show" width="400" effect="fade" footer="false">
    <div slot="modal-body" class="modal-body">
      <img :src="qrcode" alt="二维码">
      <div class="desc">
        <p>
          手机扫左边二维码预览。
        </p>
        <p>
          你也可以打开<a :href="link" target="_blank">新窗口预览</a>
        </p>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../basic/Modal';
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  components: {
    Modal
  },

  props: {
    title: {
      required: true,
      type: String
    },
    link: {
      required: true,
      type: String
    },
    qrcode: {
      required: true,
      type: String
    },
    show: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false,
      twoWay: true
    },
    onClose: {
      default: null
    }
  }
};
</script>

<style lang="less" scoped>
.modal-body {
  margin-top: 10px;
  padding-bottom: 25px;

  img {
    float: left;
    width: 130px;
    height: 130px;
    border: 1px solid #e1e1e1;
  }

  .desc {
    margin-left: 132px;
    padding: 25px 15px 0;

    p {
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
    }

    a {
      text-decoration: underline;
      color: #29b6b0;
    }
  }
}
</style>
