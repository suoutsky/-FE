<template>
  <modal :show.sync="show" title="赔率" effect="fade" width="600" class="oddsmodal" :on-close="close">
    <div slot="modal-body" class="modal-body">
        <div class="cf" v-for="(index, item) in oddsobj">
          <div class="fl">
            <div class="form-group">
              <label class="control-label" :class="{'label-required': index === 0}">赔率{{index + 1}}：</label>
              <input type="text" class="form-control" v-model="item.val" />
              <template v-if="">
                <p class="invalid" v-if="index === 0 && required">请填写赔率</p>
              </template>
              <p class="invalid" v-if="digital && item.val">请填写整数</p>
            </div>
          </div>
          <div class="fr">
            <div class="form-group">
              <label class="control-label">备注：</label>
              <div class="input-with-addon">
                <input type="text" class="form-control" v-model="item.desc" maxlength="8" placeholder="提示信息,8个字以内。">
                <a href="javascript:;" class="input-group-addon" :class="{'visibility': obj.odds.length === 1}" @click="deleteodds(index)">
                  删除
                </a>
              </div>
            </div>
          </div>
        </div>
        <a class="btn btn-green" v-if="obj.odds.length < 10" @click="addodds">添加</a>
    </div>

    <div slot="modal-footer" class="modal-footer">
      <a class="btn btn-default btn-pd-lg mr15"  @click="close">取消</a>
      <a class="btn btn-green btn-pd-lg mr20"  @click="onOk">保存</a>
    </div>
  </modal>
</template>

<script>
  import coerceBoolean from 'components/utils/coerceBoolean.js';
  import ObjectAssign from 'object-assign';

  export default {
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
      let odds = [{
        id: +new Date(),
        val: '',
        desc: ''
      }];
      let obj = ObjectAssign({}, this.itemobj);

      if (obj.odds.length === 0) {
        obj.odds = odds;
      }
      let oddsobj = ObjectAssign([], obj.odds);

      return {
        required: false,
        digital: false,
        obj: obj,
        oddsobj: oddsobj
      };
    },

    methods: {
      /**
       * 保存赔率
       */
      onOk() {
        let odds = this.validator();

        if (this.required || this.digital) {
          setTimeout(() => {
            this.digital = false;
            this.required = false;
          }, 1000);
          return;
        }
        this.obj.odds = odds;

        let obj = ObjectAssign({}, this.obj);

        if (this.onSave) {
          this.onSave(obj);
          this.close();
        }
      },
      /**
       * 取消添加赔率
       */
      close() {
        this.onClose();
        const body = document.body;
        body.classList.remove('modal-open');
      },
      /**
       * 添加赔率
       */
      addodds: function() {
        this.oddsobj.push({
          id: +new Date(),
          val: '',
          desc: ''
        });
      },
      /**
       * 验证
       */
      validator: function() {
        let odds = [];
        let self = this;

        this.oddsobj.forEach(function(item, index) {
          if (!item.val && index === 0) {
            self.required = true;
          }
          if (!/^[0-9][0-9]*$/.test(item.val) && index !== 0) {
            self.digital = true;
          }
          if (item.val) {
            odds.push(item);
          }
        });
        return odds;
      },
      /**
       * 删除赔率
       */
      deleteodds: function(index) {
        this.oddsobj.splice(index, 1);
      }
    }
  };
</script>

<style lang="less">

  .oddsmodal .cf .fl {
    width: 200px;
  }
  .oddsmodal .cf .fr {
    width: 360px;
  }
  .oddsmodal .cf .fr .input-group-addon {
    color: #29b6b0;
    border: none;
  }
  .oddsmodal .modal-footer {
    text-align: right;
  }
  .oddsmodal .control-label {
    width: 66px;
  }
  .oddsmodal .form-group {
    padding-left: 76px;
  }
  .oddsmodal .visibility {
    visibility: hidden;
  }
</style>
