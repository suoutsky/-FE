import fileupload from './FileUpload';
import coerceNumber from '../utils/coerceNumber.js';

export default {
  components: {
    fileupload
  },

  props: {
    width: {
      type: Number,
      coerce: coerceNumber,
      required: true
    },
    height: {
      coerce: coerceNumber,
      type: Number,
      default: 'auto'
    },
    size: {
      type: Number,
      coerce: coerceNumber,
      default: 1024 * 1024 * 10
    },
    errorTip: {
      type: String,
      default: ''
    },
    extensions: {
      type: String,
      default: 'jpg,png,jpeg'
    }
  },

  events: {
    addFileUpload: 'addFileUpload',
    afterFileUpload: 'afterFileUpload'
  },

  methods: {
    addFileUpload: function(file, component) {
      this.errorTip = '';
      let nameType = false;
      let extArray = this.extensions.split(',');
      extArray.forEach((item) => {
        if (file.name.indexOf(item) !== -1 && !nameType) {
          nameType = true;
        }
      });
      if (!nameType) {
        this.errorTip = '上传的图片格式不符合要求';
        return;
      }

      if (file.size > this.size) {
        this.errorTip = '图片大小超过上传大小';
        return;
      }
      if (+file.width !== +this.width || (this.height && +file.height !== +this.height)) {
        this.errorTip = '上传的图片尺寸不符合要求';
        return;
      }
      component.active = true;
    }
  }
};
