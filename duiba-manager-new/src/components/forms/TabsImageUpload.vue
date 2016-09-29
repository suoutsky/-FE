<template>
  <div class="tabs-image-upload">
    <ul class="image-nav-tabs cf" role="tablist">
      <li v-for="(key, tab) in tabs" @click.prevent="select(key)" v-if="!tab.hide">
        <a :class="{active: isActive(key), 'tabrequired': tab.required}" href="javascript:void(0)">
          {{tab.title}}
          <i class="iconhandle" :class="{'active': tab.multi ? tab.images.length !== 0 : !!tab.imageUrl}">&#xe629;</i>
        </a>
      </li>
    </ul>
    <div class="tab-content" v-el:tab-content>
      <template v-for="(key, tab) in tabs" v-if="!tab.hide">
        <div role="tabpanel" class="tab-pane active" v-show="isActive(key)">
          <p class="warn-tip" v-show="tab.warnTip"><span class="c-orange">注：</span>{{{tab.warnTip}}}</p>
          <multiimage v-if="tab.multi" :images.sync="tab.images" :width="tab.width" :height="tab.height"></multiimage>
          <imageupload v-else :url.sync="tab.imageUrl" :width="tab.width" :height="tab.height" :tip="tab.uploadTip" :psdurl="tab.psdurl"></imageupload>
          <p class="invalid">{{tab.error}}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import imageupload from './ImageUpload';
import multiimage from './MultiImageUpload';

export default {
  components: {
    imageupload,
    multiimage
  },

  props: {
    tabs: {
      type: Object,
      twoWay: true,
      default: () => {
        return {};
      }
    },
    index: {
      type: String,
      default: ''
    }
  },

  events: {
    'uploaded': 'imageUploaded'
  },

  methods: {
    select: function(index) {
      this.index = index;
    },

    isActive: function(index) {
      return index === this.index;
    },

    imageUploaded: function() {
      this.tabs[this.index].error = '';
    }
  }
};
</script>

<style lang="less">
.tabs-image-upload {
  max-width: 820px;
  border: 1px solid #e5e5e5;
  padding: 5px 10px;
  background-color: #fff;

  .image-nav-tabs {
    border-bottom: 1px solid #e5e5e5;

    li {
      font-size: 14px;
      position: relative;
      bottom: -1px;
      margin: 0 10px;
      float: left;
      line-height: 34px;

      &:first-child {
        margin-left: 0;        
      }

      &::before {
        content: ' ';
        position: absolute;
        top: 9px;
        right: -10px;
        height: 16px;
        border-right: 1px dashed #d8d8d8;
      }

      &:last-child::before {
        display: none;
      }

      a {
        display: block;
        border-bottom: 2px solid transparent;
        padding: 0 25px 0 15px;
        padding-right: 25px;
        position: relative;
        color: #888;
      }
      .tabrequired {
        &:after {
          content: '*';
          position: absolute;
          top: 0;
          left: 0;
          height: 16px;
          color: red;
        }
      }

      a.active {
        font-weight: normal;
        border-bottom: 2px solid #29b6b0;
        color: #444;
      }

      .iconhandle {
        font-size: 12px;
        position: absolute;
        top: -5px;
        right: 8px;

        &.active {
          color: #29b6b0;
        }
      }
    }
  }

  .tab-content {
    padding: 10px 0;
  }

  .warn-tip {
    font-size: 14px;
    color: #535353;
    padding: 10px 0 15px;
    border-bottom: 1px dashed #d8d8d8;

    a {
      text-decoration: underline;
      color: #29b6b0;
    }
  }

  .image-upload-container,
  .multi-image-upload {
    margin-top: 20px;
  }
} 
</style>

