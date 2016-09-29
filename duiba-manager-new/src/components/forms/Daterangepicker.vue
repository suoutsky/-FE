<template>
  <div class="date-range" :error-show.sync="false">
    <datepicker :value.sync="start" rangeflag="true" :on-change="selectDate('start')" placeholder="起始时间" :disabled-date="disabledDate">
    </datepicker>
    <span class="range-split">-</span>
    <datepicker :value.sync="end" rangeflag="true" :on-change="selectDate('end')" placeholder="结束时间" :disabled-date="disabledDate">
    </datepicker>
    <p class="date-range-error" v-show="errorShow">{{errorTip}}</p>
  </div>
</template>

<script>
import datepicker from './Datepicker';
import getCurDate from '../utils/getCurDate';
import coerceNumber from '../utils/coerceNumber';
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  components: {
    datepicker
  },

  props: {
    start: {
      type: String,
      default: getCurDate()
    },
    end: {
      type: String,
      default: getCurDate()
    },
    range: {
      type: Number,
      coerce: coerceNumber,
      default: null
    },
    disabledDate: {
      type: Function,
      default: () => {

      }
    },
    errorShow: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    }
  },

  watch: {
    start() {
      var startTime = new Date(this.start);
      var endTime = new Date(this.end);
      if (startTime.getTime() > endTime.getTime()) {
        this.end = this.start;
      }
    },
    end() {
      var startTime = new Date(this.start);
      var endTime = new Date(this.end);
      if (endTime.getTime() < startTime.getTime()) {
        this.start = this.end;
      }
    }
  },

  data() {
    return {
      errorTip: ''
    };
  },

  methods: {
    selectDate: function(type) {
      return (date) => {
        if (!this.range) {
          return;
        }
        var oneDay = 24 * 60 * 60 * 1000;
        var startTime = new Date(this.start);
        var endTime = new Date(this.end);
        // 选择的是起始时间，且区间大于range
        if ((type === 'start' && Math.round(Math.abs((endTime.getTime() - date.getTime()) / (oneDay))) > this.range) || (type === 'end' && Math.round(Math.abs((date.getTime() - startTime.getTime()) / (oneDay))) > this.range)) {
          this.errorTip = '时间范围不能超过' + this.range + '天';
          this.errorShow = true;
        } else {
          this.errorTip = '';
          this.errorShow = false;
        }
      };
    }
  }
};
</script>

<style lang="less">
.date-range {
  position: relative;
  border: 1px solid #ccc;
  display: inline-block;
  background-color: #fff;
  height: 32px;
  border-radius: 2px;
  &:hover {
     border-color: #888;
  }
  .range-split {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
  }
  .datepicker .form-control {
    border: 0;
    height: 32px;
    line-height: 32px;
  }
  .date-range-error {
    font-size: 12px;
    color: #ff795c;
    margin-top: 10px;
    line-height: 1.5;
    position: absolute;
    bottom: -25px;
    left: 0;
  }
}
</style>
