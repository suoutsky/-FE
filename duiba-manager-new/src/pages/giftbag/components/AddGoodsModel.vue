<template>
  <modal :show.sync="show" title="添加商品"  width="600" class="addgift"  :on-close="close" @click="selectclose">
    <div slot="modal-body" class="modal-body" >
      <validator name="validatorm">
        <div class="form-group">
          <label class="control-label label-required" >选择商品：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.prizeName" :class="{'form-control-dirty': $validator.prizename.dirty}"
                   v-validate:prizename="fields.prizename" placeholder="选择优惠券"/>
            <div class="input-group-addon"><i class="iconhandle" @click="awsearch">&#xe614;</i></div>
            <div class="items-list" :class="{'hide': !awsearchlist}">
              <template v-for="(index, oitem) in  obj">
                <a href="javascript:;" class="item" @click="selectObj(oitem)" >{{oitem.title}}({{oitem.appItemId}})</a>
              </template>
            </div>
          </div>
          <p class="invalid" v-if="hasValidationError('prizename', 'validatorm', hasSubmited)">
            {{firstValidationMessage('prizename', 'validatorm')}}</p>
        </div>
        <div class="form-group">
          <label class="control-label label-required" >商品数量：</label>
          <input type="text" class="form-control" v-model="params.remainChange" :class="{'form-control-dirty': $validator.remainchange.dirty}"
                 v-validate:remainchange="fields.remainchange" :placeholder="fields.remainchange.max.message" />
          <p class="invalid" v-if="hasValidationError('remainchange', 'validatorm', hasSubmited)">
            {{firstValidationMessage('remainchange', 'validatorm')}}</p>
        </div>
        <div class="form-group">
          <label class="control-label" >商品介绍：</label>
          <textarea v-model="params.description" maxlength="30" placeholder="奖品的简要说明，将展示的礼包领取页面，不超过30个字" class="form-control introduce"></textarea>
        </div>
      </validator>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <a class="btn btn-default btn-pd-lg mr15"  @click="close">取消</a>
      <a class="btn btn-green btn-pd-lg mr20"  @click="onOk">确认</a>
    </div>
  </modal>
</template>
<script>
import validationMixins from 'components/utils/validationMixins';
import addgoodsmixins from './AddGoodsMixins';
import messagebox from 'components/basic/MessageBox';

export default {
  mixins: [validationMixins, addgoodsmixins],

  methods: {

    onOk() {
      if (this.$validatorm.invalid) {
        this.hasSubmited = true;
        this.$setValidationErrors(this.$validatorm.errors);
        return;
      }

      this.onSave(this.params);

      this.close();
    },
    close() {
      this.onClose();
      const body = document.body;
      body.classList.remove('modal-open');
    },
    selectclose: function() {
      this.awsearchlist = false;
    },
    /**
     * 选择兑换项
     * @param item
     */
    selectObj: function(item) {
      this.params.prizeName = item.title;
      this.params.itemId = item.appItemId;
      this.fields.remainchange.max.rule = item.max;
      this.fields.remainchange.max.message = '剩余商品数不得超过' + item.max;
      this.awsearchlist = false;
    },
    awsearch: function() {
      let param = {
        type: 'coupon',
        name: this.params.prizeName
      };
      this.$http.get('/AdminDuiBaHdTool/ajaxFindItemByName', {
        params: param
      }).then((res) => {
        res = res.json();
        if (res.success) {
          this.$set('obj', res.list);
          this.awsearchlist = true;
        } else {
          messagebox({
            title: res.desc || '请求错误！',
            type: 'error'
          });
        }
      }, () => {
        messagebox({
          title: '网络错误',
          type: 'error'
        });
      });
    }
  }
};
</script>
<style lang="less">
  .addgift {
    .introduce {
      resize: none;
      width:100px;
      height:100px;
      overflow: hidden;
      width:452px;
    }
    .modal-footer {
      text-align: right;
    }
    .iconhandle {
      cursor: pointer;

    }
  .items-list {
    position: absolute;
    z-index: 10;
    top: 34px;
    width: 100%;
    background-color: #fff;
    height: 190px;
    max-height: 190px;
    overflow-y: scroll;
    box-shadow: 2px 2px 10px rgba(51, 51, 51, 0.3);
    border-radius: 2px;
    left: 0;
    padding: 5px 0;
    .item {
      display: block;
      border-bottom: 1px solid #e9e9e9;
      color: #444;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      overflow: hidden;
    &:hover {
       background: #29b6b0;
       color: #fff;
     }
    }
    }
  }
</style>
