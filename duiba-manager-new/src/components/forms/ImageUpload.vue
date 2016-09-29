<template>
  <div class="image-upload-container cf w-{{width}}-h-{{height}}">
    <div class="img fl" v-bind:class="{
      'img-uploaded': !!url
    }">
      <p>
        <img :src="url" alt="">
      </p>
    </div>
    <div class="upload-area">
      <div class="upload-cell">
        <p v-if="tip">{{tip}}</p>
        <a v-if="psdurl" :href="psdurl" class="psd-link">下载PSD</a>
        <div class="upload-btn">
          <fileupload class="file-upload" name="file" post-action="/upload/image" put-action="/upload/image" :extensions="extensions" :accept="accept" :size="size"></fileupload>
          <a href="javascript:void(0)" class="btn btn-default">选择上传</a>
        </div>
      </div>
    </div>
    <p class="invalid">{{errorTip}}</p>
  </div>
</template>

<script>
import ImageUploadMixins from './ImageUploadMixins.js';

export default {
  mixins: [ImageUploadMixins],

  computed: {
    accept: function() {
      let str = [];
      if (this.extensions.indexOf('jpg') !== -1) {
        str.push('image/jpg');
      }
      if (this.extensions.indexOf('jpeg') !== -1) {
        str.push('image/jpeg');
      }
      if (this.extensions.indexOf('png') !== -1) {
        str.push('image/png');
      }
      if (this.extensions.indexOf('gif') !== -1) {
        str.push('image/gif');
      }
      return str.join(',');
    }
  },

  props: {
    tip: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      twoWay: true,
      default: ''
    },
    psdurl: {
      type: String,
      default: ''
    }
  },

  methods: {
    afterFileUpload: function(file) {
      this.url = file.data.data.url;
      this.$dispatch('uploaded');
    }
  }
};
</script>
