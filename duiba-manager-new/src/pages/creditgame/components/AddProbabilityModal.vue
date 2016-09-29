<template>
  <modal :show.sync="show" title="概率" effect="fade" width="420" class="promodal" :on-close="close">
    <div slot="modal-body" class="modal-body">
      <validator name="validatorm">
      <div class="form-group">
        <label class="control-label label-required">中奖概率：</label>
        <input type="text" class="form-control" v-model="val" :class="{'form-control-dirty': $validator.val.dirty}"
               v-validate:val="fields.val" :placeholder="fields.val.max.message">
        <p class="invalid" v-if="hasValidationError('val', 'validatorm', hasSubmited)">
          {{firstValidationMessage('val', 'validatorm')}}</p>
      </div>
    </validator>
    </div>

    <div slot="modal-footer" class="modal-footer">
      <a class="btn btn-default btn-pd-lg mr15"  @click="close">取消</a>
      <a class="btn btn-green btn-pd-lg mr20"  @click="onOk">保存</a>
    </div>
  </modal>
</template>

<script>
  import validationMixins from 'components/utils/validationMixins';
  import coerceBoolean from 'components/utils/coerceBoolean.js';
  import ObjectAssign from 'object-assign';

  export default {
    mixins: [validationMixins],
    props: {
      onClose: {
        default: null
      },
      show: {
        required: true,
        type: Boolean,
        coerce: coerceBoolean,
        default: false
      },
      pronum: {
        default: null
      },
      onSave: {
        default: null
      },
      itemobj: {
        default: null
      },
      onOk: {
        type: Function,
        default() {}
      }
    },
    data() {
      let obj = ObjectAssign({}, this.itemobj);

      let countnum = 100;

      let val = obj.probability ? parseFloat(obj.probability) : 0;

      countnum = countnum - (this.pronum - val);

      return {
        val: val,
        hasSubmited: false,
        obj: obj,
        fields: {
          val: {
            required: {
              rule: true,
              message: '请填写中奖概率'
            },
            min: {
              rule: 0,
              message: '中奖概率不能小于0'
            },
            max: {
              rule: countnum,
              message: '中奖几率总和为100，当前概率不能超过' + countnum
            },
            pattern: {
              rule: '/^[0-9]+(\.[0-9]{0,2})?$/',
              message: '最多只能有2位小数'
            }
          }
        }
      };
    },

    methods: {
      /**
       * 保存奖品
       */
      onOk() {
        if (this.$validatorm.invalid) {
          this.hasSubmited = true;
          this.$setValidationErrors(this.$validatorm.errors);
          return;
        }
        if (this.onSave) {
          this.obj.probability = this.val;
          this.onSave(this.obj);
          this.close();
        }
      },
      /**
       * 取消添加奖品
       */
      close() {
        this.onClose();
        const body = document.body;
        body.classList.remove('modal-open');
      }
    }
  };
</script>

<style lang="less">
  .promodal .modal-footer {
    text-align: right;
  }
  .promodal .form-group .form-control {
    font-size: 12px;
  }
</style>
