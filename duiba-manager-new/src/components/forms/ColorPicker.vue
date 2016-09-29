<template>
  <div class="colorpicker-wrapper">
    <div class="colorpicker-trigger" :class="{'active': active}" @click="active = !active">
      <span class="color-preview" :style="{backgroundColor: bgColor}"></span>
      <i class="iconhandle">&#xe618;</i>
    </div>
    <div class="color-box-wrapper" v-show="active">
      <div id="picker-wrapper">
          <div id="picker"></div>
          <div id="picker-indicator"></div>
      </div>
      <div id="slider-wrapper">
          <div id="slider"></div>
          <div id="slider-indicator"></div>
      </div>
      <div class="clearfix" style="margin-top: 5px;">
        <input type="text" name="" class="form-control" v-model="colorBackup" />
        <div class="palette">
          <span :style="{backgroundColor: colorBackup}"></span><span :style="{backgroundColor: bgColor}"></span>
        </div>
      </div>
      <div class="color-options">
        <a href="javascript:;" class="btn btn-default" @click="active = false" >取消</a>
        <a href="javascript:;" class="btn btn-green" @click="chooseColor">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
import ColorPicker from 'components/utils/colorpicker';

export default {
  props: {
    color: {
      type: String,
      twoWay: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false,
      colorBackup: '#fe4a61'
    };
  },
  computed: {
    bgColor: function() {
      return this.type === 'tag' ? '#' + this.color : this.color;
    }
  },
  ready() {
    let self = this;
    this.colorBackup = this.type === 'tag' ? '#' + this.color : this.color;

    this.colorpicker = ColorPicker(
      document.getElementById('slider'),
      document.getElementById('picker'),
      function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {
        ColorPicker.positionIndicators(
          document.getElementById('slider-indicator'),
          document.getElementById('picker-indicator'),
          sliderCoordinate, pickerCoordinate
        );
        self.colorBackup = hex;
      });

    ColorPicker.fixIndicators(
      document.getElementById('slider-indicator'),
      document.getElementById('picker-indicator')
    );

    this.colorpicker.setHex(this.colorBackup);
  },
  methods: {
    chooseColor: function() {
      this.color = this.type === 'tag' ? this.colorBackup.slice(1) : this.colorBackup;
      this.active = false;
    }
  }
};
</script>
<style lang="less" scoped>
.colorpicker-wrapper{
  position: relative;
  display: inline-block;
  margin-right: 10px;
  .color-box-wrapper{
    position: absolute;
    top: 50px;
    left: 0px;
    width: 240px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    border-top-left-radius: 0px;
    z-index: 5;
  }
  .clearfix{
    *zoom: 1;
    &:before, &:after {
      content: ' ';
      display: table;
    }
    &:after {
      clear: both;
    }
  }
  .form-control{
    height: 28px;
    display: inline-block;
    width: 160px;
    float: left;
  }
  .palette{
    display: inline-block;
    float: right;
    span{
      display: inline-block;
      width: 34px;
      height: 28px;
    }
  }
  .color-options{
    margin-top: 10px;
    text-align: right;
    .btn-default{
      margin-right: 7px;
    }
  }
  #picker-wrapper {
    position: relative;
    display: inline-block;
    #picker{
      width: 200px;
      height: 200px;
    }
  }
  #slider-wrapper {
    position: relative;
    display: inline-block;
    float: right;
    #slider{
      width: 30px;
      height: 200px;
    }
  }
  #picker-indicator {
    width: 6px;
    height: 6px;
    background-color: #000;
    border-radius: 50%;
    position: absolute;
    border: 1px solid white;
  }
  #slider-indicator {
    width: 100%;
    height: 5px;
    left: -1px;
    position: absolute;
    border: 1px solid black;
  }
}
.colorpicker-trigger{
  border-radius: 2px;
  border: 1px solid #ccc;
  padding: 5px;
  cursor: pointer;
  background-color: #fff;
  user-select: none;
  position: relative;
  z-index: 2;
  &.active{
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom: 0px;
  }
  &:hover .iconhandle{
    color: #444;
  }
  .color-preview{
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 1px;
    vertical-align: middle;
  }
  .iconhandle{
    display: inline-block;
    height: 40px;
    color: #888;
    font-size: 12px;
    line-height: 40px;
    padding: 0px 5px;
    vertical-align: middle;
  }
}
.tag-colorpicker {
  .colorpicker-trigger {
    .iconhandle {
      display: none;
    }

    .color-preview {
      height: 22px;
      width: 76px;
    }
  }

  .color-box-wrapper {
    top: 33px;

    .form-control {
      padding-left: 10px;
      width: 160px;
      margin-right: 0;
    }
  }
}
</style>
