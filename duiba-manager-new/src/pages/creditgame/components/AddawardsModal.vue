<template>
  <modal :show.sync="show" title="选择奖品" effect="fade" width="600" class="addawards" :on-close="close">
    <div slot="modal-body" class="modal-body" v-show="islazy">
      <validator name="validatorm" lazy>
      <div class="form-group">
        <label class="control-label label-required">选择奖品：</label>
        <select class="awardtype" v-model="params.type" @change="changeType" :class="{'typevirtual': params.type === 'virtual'}" v-validate:type="fields.type">
          <option value="">请选择</option>
          <template v-for="(index, item) in awardtype">
            <option :value="item.id">{{item.label}}</option>
          </template>
        </select>

        <template v-if="params.type === 'phonebill'">
          <select v-show="data.items.phonebill" class="phonebill" v-validate:phonebill="fields.phonebill" v-model="params.value">
            <option value="">请选择</option>
            <option value="10">10元</option>
            <option value="20">20元</option>
            <option value="50">50元</option>
          </select>
          <span class="no-award" v-if="!data.items.phonebill">没有可用奖品！去兑吧奖品库添加吧。</span>
        </template>

        <template v-if="params.type === 'alipay'">
          <div class="sec-inp" v-show="data.items.alipay">
            <input type="text" class="inp-text" v-validate:alipay="fields.alipay" :class="{'form-control-dirty': $validatorm.alipay.dirty}" v-model="params.value" maxlength="5" placeholder="请填写整数面额"/>
            <i class="unit">元</i>
          </div>
          <span v-if="!data.items.alipay" class="no-award">没有可用奖品！去兑吧奖品库添加吧。</span>
        </template>

        <template v-if="params.type === 'qb'">
          <div class="sec-inp" v-show="data.items.qb">
            <input type="text" class="inp-text" v-validate:qb="fields.qb" :class="{'form-control-dirty': $validatorm.qb.dirty}" v-model="params.value" maxlength="5" placeholder="请填写整数"/>
            <i class="unit">个</i>
          </div>
          <span v-if="!data.items.qb" class="no-award">没有可用奖品！去兑吧奖品库添加吧。</span>
        </template>

        <div class="sec-search" v-if="params.type === 'object'">
          <input type="text" class="inp-text" v-validate:value="fields.value" :class="{'form-control-dirty': $validatorm.value.dirty}" v-model="params.name" placeholder="搜索兑换项" />
          <i class="iconhandle js-awsearch" @click="awsearch">&#xe614;</i>
          <div class="items-list" :class="{'hide': !awsearchlist}">
            <template v-for="(index, oitem) in  obj.list">
              <a href="javascript:;" class="item" title="{{oitem.title}}({{oitem.appItemId}})"  @click="selectObj(oitem)" >{{oitem.title}}({{oitem.appItemId}})</a>
            </template>
          </div>
        </div>
        <div class="sec-search" v-if="params.type === 'coupon'">
          <input type="text" class="inp-text" v-validate:coupon="fields.coupon" :class="{'form-control-dirty': $validatorm.coupon.dirty}" v-model="params.name" placeholder="搜索兑换项" />
          <i class="iconhandle js-awsearch" @click="awsearch">&#xe614;</i>
          <div class="items-list" :class="{'hide': !awsearchlist}">
            <template v-for="(index, oitem) in  obj.list">
              <a href="javascript:;" class="item" title="{{oitem.title}}({{oitem.appItemId}})" @click="selectObj(oitem)" >{{oitem.title}}({{oitem.appItemId}})</a>
            </template>
          </div>
        </div>

        <span v-if="params.type === 'lucky'" style="font-size: 12px;line-height: 34px;color: #888; padding-left: 10px">选择幸运奖发放给用户，奖品由兑吧提供！</span>

        <template v-if="params.type === 'virtual'">
          <select class="virtual" v-model="params.appItemId" @change="virtualFun(params.appItemId)">
            <option value="" :selected="!params.appItemId">请选择</option>
            <template v-for="(index, vir) in  data.virtualList">
              <option :value="vir.appItemId" :selected="params.appItemId === vir.appItemId">{{vir.text}}</option>
            </template>
          </select>
          <select class="virtual" v-model="params.value" v-validate:virtual="fields.virtual" v-el:virtual>
            <option value="" :selected="!params.value">请选择</option>
            <template v-for="(index, gear) in  virtual.gear">
              <option :value="gear.id" :selected="params.value === gear.text">{{gear.text}}</option>
            </template>
          </select>
        </template>
        <p class="invalid" v-if="hasValidationError('type', 'validatorm', hasSubmited)">{{firstValidationMessage('type', 'validatorm')}}</p>
        <p class="invalid" v-if="hasValidationError('value', 'validatorm', hasSubmited)">{{firstValidationMessage('value', 'validatorm')}}</p>
        <p class="invalid" v-if="hasValidationError('coupon', 'validatorm', hasSubmited)">{{firstValidationMessage('coupon', 'validatorm')}}</p>
        <p class="invalid" v-if="hasValidationError('qb', 'validatorm', hasSubmited)">{{firstValidationMessage('qb', 'validatorm')}}</p>
        <p class="invalid" v-if="hasValidationError('alipay', 'validatorm', hasSubmited)">{{firstValidationMessage('alipay', 'validatorm')}}</p>
        <p class="invalid" v-if="hasValidationError('phonebill', 'validatorm', hasSubmited)">{{firstValidationMessage('phonebill', 'validatorm')}}</p>
        <p class="invalid" v-if="hasValidationError('virtual', 'validatorm', hasSubmited)">{{firstValidationMessage('virtual', 'validatorm')}}</p>
        <p class="invalid" v-if="awardtip">此奖品含有地域限制，不建议被配置为奖品，请谨慎操作！</p>
      </div>
      <div class="form-group">
        <label class="control-label label-required">奖品图片：</label>
        <imageupload :url.sync="tab.imageUrl" :width="tab.width" :height="tab.height" :tip="tab.uploadTip" extensions="jpg,png,jpeg"></imageupload>
        <input type="hidden" v-validate:imageurl="fields.imageurl" v-model="tab.imageUrl"/>
        <p class="invalid" v-if="hasValidationError('imageurl', 'validatorm', hasSubmited)">{{firstValidationMessage('imageurl', 'validatorm')}}</p>
        <p class="invalid" v-show="!hasValidationError('imageurl', 'validatorm', hasSubmited) && imageIsRepeat">已存在相同默认图标，请更换图标</p>
      </div>
      <div class="form-group">
        <label class="control-label label-required">奖品信息：</label>
        <input type="text" class="form-control" maxlength="6" @change="changeVal(params.title)" :class="{'form-control-dirty': $validatorm.title.dirty}" v-validate:title="fields.title" v-model="params.title" placeholder="展示奖品的信息文案，不超过6个字">
        <p class="invalid" v-if="hasValidationError('title', 'validatorm', hasSubmited)">{{firstValidationMessage('title', 'validatorm')}}</p>
      </div>

      <template v-if="params.type === 'lucky'">
        <div class="form-group">
          <label class="control-label label-required">中奖概率：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-validate:prolucky="fields.prolucky" :class="{'form-control-dirty': $validatorm.prolucky.dirty}" v-model="params.probability" :placeholder="fields.prolucky.max.message">
            <div class="input-group-addon">%</div>
          </div>
          <p class="invalid" v-if="hasValidationError('prolucky', 'validatorm', hasSubmited)">{{firstValidationMessage('prolucky', 'validatorm')}}</p>
        </div>
      </template>

      <template v-if="params.type === 'again'">
        <div class="form-group">
          <label class="control-label label-required">中奖概率：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-validate:proagain="fields.proagain" :class="{'form-control-dirty': $validatorm.proagain.dirty}" v-model="params.probability" :placeholder="fields.proagain.max.message">
            <div class="input-group-addon">%</div>
          </div>
          <p class="invalid" v-if="hasValidationError('proagain', 'validatorm', hasSubmited)">{{firstValidationMessage('proagain', 'validatorm')}}</p>
        </div>
      </template>

      <template v-if="params.type !== 'thanks' && params.type !== 'again' && params.type !== 'lucky'">
        <div class="form-group">
          <label class="control-label label-required">剩余奖品数：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-validate:remaind="fields.remaind" :class="{'form-control-dirty': $validatorm.remaind.dirty}" v-model="params.remaind" placeholder="可抽中的奖品总数，抽完之后中奖概率为0">
            <div class="input-group-addon">件</div>
          </div>
          <p class="invalid" v-if="hasValidationError('remaind', 'validatorm', hasSubmited)">{{firstValidationMessage('remaind', 'validatorm')}}</p>
        </div>
        <div class="form-group">
          <label class="control-label label-required">中奖概率：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-validate:probability="fields.probability" :class="{'form-control-dirty': $validatorm.probability.dirty}" v-model="params.probability" :placeholder="fields.probability.max.message">
            <div class="input-group-addon">%</div>
          </div>
          <p class="invalid" v-if="hasValidationError('probability', 'validatorm', hasSubmited)">{{firstValidationMessage('probability', 'validatorm')}}</p>
        </div>
        <div class="form-group">
          <label class="control-label">中奖限制：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-validate:limit="fields.limit" :class="{'form-control-dirty': $validatorm.limit.dirty}" v-model="params.limit" placeholder="每个用户最多能抽中此奖项多少次，不填为无限制">
            <div class="input-group-addon">次</div>
          </div>
          <p class="invalid" v-if="hasValidationError('limit', 'validatorm', hasSubmited)">{{firstValidationMessage('limit', 'validatorm')}}</p>
        </div>
        <div class="form-group">
          <label class="control-label">保底人数：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-validate:low="fields.low" :class="{'form-control-dirty': $validatorm.low.dirty}" v-model="params.low" placeholder="有多少人参与活动后才会产生奖项，不填为无限制">
            <div class="input-group-addon">位</div>
          </div>
          <p class="invalid" v-if="hasValidationError('low', 'validatorm', hasSubmited)">{{firstValidationMessage('low', 'validatorm')}}</p>
        </div>
      </template>

      <div class="form-group" :class="{ 'hide': params.type === 'lucky' }">
        <label class="control-label">奖品展示：</label>
        <dswitch :status.sync="params.show"></dswitch>
        <p class="switch-tip">
          <span>展示在活动页奖品列表</span>
          <i class="iconhandle showpevive" @mouseenter="showPeviewenter" @mouseleave="showPeviewleave">
            &#xe600;
          </i>
        </p>
        <div class="showPreviewImg" v-if="showPeview"><img :src="showpreview"/></div>
        <richeditor :toolbar="pendingSuccessToolbar" :class="{ 'hide': !params.show, 'hide': ishide  }" toolbar-id="creathtd-toolbar" editor-id="creathtd-editor" placeholder="关于奖品的文案说明" :description="params.description" :value.sync="params.description"></richeditor>
      </div>
    </validator>
    </div>

    <div slot="modal-footer" class="modal-footer">
      <a class="btn btn-default btn-pd-lg mr15"  @click="close">取消</a>
      <a class="btn btn-green btn-pd-lg"  @click="onOk" v-if="btnvalid">保存奖项</a>
      <a class="btn btn-green btn-pd-lg disabled" v-else>保存奖项</a>
    </div>
  </modal>
</template>

<script>
  import imageupload from 'components/forms/ImageUpload';
  import richeditor from 'components/forms/Richeditor';
  import validationMixins from 'components/utils/validationMixins';
  import addAwardsMixins from './AddAwardsMixins';

  export default {
    mixins: [validationMixins, addAwardsMixins],

    components: {
      imageupload,
      richeditor
    },
    compiled: function() {
      this.getObtain();
    },
    ready: function() {
      this.probabilityFun();
      this.$watch('$validatorm.valid', function(newVal) {
        this.btnvalid = newVal;
      });
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
        if (this.images.indexOf(this.tab.imageUrl) !== -1 && !this.editdata && this.subtype === 'tiger') {
          this.imageIsRepeat = true;
          return;
        }
        if (this.onSave) {
          let awards = {};
          awards.type = this.params.type;
          awards.title = this.params.title;
          awards.img = this.tab.imageUrl;
          awards.valid = this.params.valid;
          awards.probability = this.params.probability;
          awards.show = this.params.show;
          awards.arealimit = this.params.arealimit;

          let probability = this.params.probability ? parseFloat(this.params.probability) : 0;

          this.countnum = this.countnum - probability;

          this.probabilityFun();

          if (awards.type === 'lucky') {
            awards.show = false;
          }

          if (awards.show) {
            if (this.params.description) {
              awards.description = this.params.description;
            }
          }
          if (this.params.appItemId) {
            awards.appItemId = this.params.appItemId;
          }
          if (this.params.id) {
            awards.id = this.params.id;
          }
          if (this.params.value) {
            awards.value = this.params.value;
          }
          if (this.params.name) {
            awards.name = this.params.name;
          }
          if (this.params.limit) {
            awards.limit = this.params.limit;
          }
          if (this.params.low) {
            awards.low = this.params.low;
          }
          if (this.params.remaind) {
            awards.remaind = this.params.remaind;
          }
          this.onSave(awards, !!this.editdata);
          this.editdata = null;
          this.close();
        }
      },
      /**
       * 取消添加奖品
       */
      close() {
        this.hasSubmited = false;
        this.onClose();
        const body = document.body;
        body.classList.remove('modal-open');
      },
      /**
       * 切换奖品类型
       */
      changeType: function() {
        if (this.params.type === '') {
          this.restParams();
        } else {
          this.params.img = this.defimg[this.params.type];
          this.tab.imageUrl = this.defimg[this.params.type];
          this.params.name = '';
          this.params.value = '';
          this.params.appItemId = '';
          this.awardtip = false;
        }
        this.probabilityFun();
      },
      /**
       * 切换奖品类型
       */
      changeVal: function(val) {
        this.params.title = val.replace(/(^\s*)|(\s*$)/g, '');
      },
      /**
       * 中奖概率显示
       */
      probabilityFun: function() {
        if (this.params.type === 'lucky') {
          this.fields.prolucky.max.rule = this.countnum;
          this.fields.prolucky.max.message = '中奖几率总和为100，当前概率不能超过' + this.countnum;
        } else if (this.params.type === 'again') {
          this.fields.proagain.max.rule = this.countnum;
          this.fields.proagain.max.message = '中奖几率总和为100，当前概率不能超过' + this.countnum;
        } else {
          this.fields.probability.max.rule = this.countnum;
          this.fields.probability.max.message = '中奖几率总和为100，当前概率不能超过' + this.countnum;
        }
      },
      /**
       * 兑换项搜索
       */
      awsearch: function() {
        let params = {
          type: this.params.type,
          name: this.params.name,
          appId: duiba.appId
        };
        this.$http.post('/launch/findItemBySearch', params).then((res) => {
          res = res.json();
          if (res.success) {
            this.$set('obj', res.data);
            this.awsearchlist = true;
          }
        }, (res) => {

        });
      }
    }
  };
</script>

<style lang="less">
  .awardtype {
    display: inline-block;
    width: 190px;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  .addawards .control-label{
    font-weight: 400;
    font-size: 12px;
  }
  .addawards .form-group{
    margin-bottom: 10px;
  }
  .addawards .modal-footer{
    padding-right: 20px;
    text-align: right;
  }
  .addawards .richeditor textarea{
    width: 410px;
    height: 100px;
  }
  .addawards .richeditor{
    width: 92%;
  }
  .addawards .richeditor-toolbar .create-link {
    position: absolute;
    top: 0;
    right: -40px;
    width: 22px;
    border: 1px solid #d9d9d9;
    height: 22px;
    padding: 0;
    text-align: center;
    line-height: 22px;
    border-radius: 2px;
  }
  .phonebill {
    height: 34px;
    font-size: 12px;
    width: 130px;
    margin-left: 20px;
    line-height: 34px;
    border-radius: 2px;
    padding-left: 10px;
    border: 1px solid #ccc;
  }

  .virtual {
    height: 34px;
    font-size: 12px;
    width: 138px;
    margin-left: 10px;
    line-height: 34px;
    border-radius: 2px;
    padding-left: 10px;
    border: 1px solid #ccc;
    vertical-align: middle;
  }
  .typevirtual {
    width: 150px;
  }

  .sec-inp {
    position: absolute;
    top: 0;
    right: 50px;
    padding-right: 32px;
  .inp-text {
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    font-size: 12px;
    border: 1px solid #E1E1E1;
    width: 148px;
    border-radius: 2px 0 0 2px;
    outline: none;
  }
  .form-control-dirty.invalid{
    border: 1px solid #F66B4E;
  }
  .unit {
    position: absolute;
    top: 0;
    right: 0;
    height: 32px;
    border: 1px solid #e9e9e9;
    border-radius: 0 2px 2px 0;
    font-size: 12px;
    display: inline-block;
    line-height: 32px;
    width: 32px;
    font-style: normal;
    text-align: center;
    border-left: 0;
  }
  }
  .sec-search {
    position: absolute;
    top: 0;
    right: 0px;
    padding-right: 32px;
  .inp-text {
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    font-size: 12px;
    border: 1px solid #E1E1E1;
    width: 190px;
    border-radius: 2px 0 0 2px;
    border-right: 0;
    padding-right: 5px;
    outline: none;
  }
  .form-control-dirty.invalid{
    border: 1px solid #F66B4E;
  }
  .iconhandle {
    position: absolute;
    top: 0;
    right: 0;
    height: 32px;
    border: 1px solid #e9e9e9;
    border-radius: 0 2px 2px 0;
    font-size: 12px;
    display: inline-block;
    line-height: 32px;
    width: 32px;
    text-align: center;
    border-left: 0;
    color: #bbb;
  }
  }
  .items-list {
    position: absolute;
    z-index: 10;
    top: 34px;
    width: 100%;
    background-color: #fff;
    height: 300px;
    max-height: 300px;
    overflow-y: scroll;
    box-shadow: 2px 2px 10px rgba(51, 51, 51, 0.3);
    border-radius: 2px;
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
  .showpevive {
    display: table-cell;
    vertical-align: middle;
    font-size: 14px;
    color: #bbb;
    padding-left: 10px;
    cursor: pointer;
  }
  .addawards .showPreviewImg{
    right: 258px;
  }
  .addawards .image-upload-container.w-250-h-250 img {
    background: #fff;
  }
  .addawards .no-award{
    line-height: 34px;
    font-size: 12px;
    vertical-align: middle;
    color: #999999;
  }
</style>
