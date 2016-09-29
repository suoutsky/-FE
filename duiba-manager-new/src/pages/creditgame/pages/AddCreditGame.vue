<template>
  <pagetitle title="积分游戏" :sub-title="subtitle"></pagetitle>
  <div class="page-content">
    <div class="form-groups-chunk">
      <div class="stepprogress cf mb20">
        <div class="node active"><p class="step-num">1</p>内容配置</div>
        <div class="line"></div>
        <div class="node"><p class="step-num">2</p>界面配置</div>
      </div>
    </div>
    <validator name="validator">
      <div class="form-groups-chunk">
        <h4>游戏规则</h4>
        <div class="form-group">
          <label class="control-label label-required">游戏标题：</label>
          <input type="text" class="form-control" v-model="params.title" v-validate:title="fields.title" maxlength="20"
                 placeholder="游戏列表等清单中用来区分游戏的名称，20个汉字以内" :class="{'form-control-dirty': $validator.title.dirty}">
          <p class="invalid" v-if="hasValidationError('title', 'validator', hasSubmited)">
            {{firstValidationMessage('title', 'validator')}}</p>
        </div>

        <div class="form-group">
          <label class="control-label">限制次数：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.drawLimit" :class="{'form-control-dirty': $validator.drawLimit.dirty}"
                   v-validate:drawLimit="fields.drawLimit" placeholder="用户可以进行抽奖的次数，不填则为无限制">
            <div class="input-group-addon select-addon">
              <i class="iconhandle">&#xe618;</i>
              <select class="select-control" v-model="params.drawScope">
                <option value="everyday">次/每天</option>
                <option value="forever">次/永久</option>
              </select>
            </div>
          </div>
          <p class="invalid" v-if="hasValidationError('drawScope', 'validator', hasSubmited)">
            {{firstValidationMessage('drawScope', 'validator')}}</p>
        </div>

        <div class="form-group">
          <label class="control-label">免费次数：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.freeLimit" :class="{'form-control-dirty': $validator.freelimit.dirty}" v-validate:freelimit="fields.freelimit"
                   placeholder="用户可以免费抽奖的次数，不填则为0次">
            <div class="input-group-addon select-addon">
              <i class="iconhandle">&#xe618;</i>
              <select class="select-control" v-model="params.freeScope">
                <option value="everyday">次/每天</option>
                <option value="forever">次/永久</option>
              </select>
            </div>
          </div>
          <p class="invalid" v-if="hasValidationError('freelimit', 'validator', hasSubmited)">
            {{firstValidationMessage('freelimit', 'validator')}}</p>
        </div>

        <div class="form-group skins">
          <label class="control-label label-required">选择皮肤：</label>
          <select class="select-control" v-model="params.skinId">
            <option value="">请选择</option>
            <template v-for="(index, item) in skins">
              <option value="item.id">{{item.title}}</option>
            </template>
          </select>
        </div>
        <div class="form-group">
          <label class="control-label">抽奖频次：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.lotteryCount" :class="{'form-control-dirty': $validator.lotteryCount.dirty}" v-validate:credits="fields.lotteryCount"
                   placeholder="用户每参与多少次游戏即可以抽奖，不填则视为不可抽奖">
            <div class="input-group-addon">次</div>
          </div>
          <p class="invalid" v-if="hasValidationError('lotteryCount', 'validator', hasSubmited)">
            {{firstValidationMessage('lotteryCount', 'validator')}}</p>
        </div>

      </div>

      <div class="form-groups-chunk">
        <h4>押注配置</h4>
        <div class="form-group">
          <label class="control-label"></label>
          <tip class="ft14">
            至少配置一个押注价值基数档位, 最多可配置3个档位
          </tip>
        </div>
        <div class="form-group">
          <label class="control-label label-required">档位1：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.betConfig.bet1" :class="{'form-control-dirty': $validator.credits.dirty}" v-validate:credits="fields.credits"
                   placeholder="档位1">
            <div class="input-group-addon">元</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">档位2：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.betConfig.bet2" :class="{'form-control-dirty': $validator.credits.dirty}" v-validate:credits="fields.credits"
                   placeholder="档位2">
            <div class="input-group-addon">元</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">档位3：</label>
          <div class="input-with-addon">
            <input type="text" class="form-control" v-model="params.betConfig.bet3" :class="{'form-control-dirty': $validator.credits.dirty}" v-validate:credits="fields.credits"
                   placeholder="档位3">
            <div class="input-group-addon">元</div>
          </div>
        </div>
      </div>

      <div class="form-groups-chunk">
        <h4>概率赔率配置</h4>
        <div class="form-group">
          <label class="control-label label-required">概率赔率：</label>
          <div class="infodata">
            <table>
              <thead>
              <tr class="tr-header">
                <th width="20%">结果</th>
                <th width="20%">概率</th>
                <th width="60%">赔率</th>
              </tr>
              </thead>
              <tbody>
              <tr class="tr-items" v-for="(index, item) in params.valveConfig">
                <td>{{item.label}}</td>
                <td>
                  <p>
                    <template v-if="item.probability">
                      {{item.probability}}%
                    </template>
                    <template v-else>-</template>
                    <a href="javascript:void(0)" class="iconhandle" @click="addProModal(item, index)">&#xe601;</a>
                  </p>
                </td>
                <td>
                  <p>
                    <template v-if="item.odds.length">
                      <template v-for="odds in item.odds">
                        {{odds.val}}
                        <template v-if="odds.desc">
                          ({{odds.desc}})
                        </template>
                        ;
                      </template>
                    </template>
                    <template v-else>-</template>
                    <a href="javascript:void(0)" class="iconhandle" @click="addOddsModal(item, index)">&#xe601;</a>
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label label-required">结束时间：</label>
          <datepicker :value.sync="params.autoOffDate" time="true" format="yyyy-MM-dd hh:ii" :disabled-date="disabledDate" placeholder="选择时间"></datepicker>
          <a href="javascript:void(0)" class="link-d ml15 ft14" @click="clearAutoOffDate">清除时间</a>
        </div>
      </div>

      <div class="form-groups-chunk">
        <h4>图片配置</h4>
        <div class="form-group">
          <label class="control-label label-required">推广图片：</label>
          <tip class="ft14 mb20">
             带*图片选项为必填项，其余则为选填。完善的资料能让您的奖品更加有吸引力
          </tip>
          <tabsimage :tabs.sync="imagesTabs" index="bannerImage"></tabsimage>
        </div>
      </div>

      <div class="form-groups-chunk">
        <h4>游戏配置</h4>
        <div class="form-group">
          <label class="control-label label-required">奖项配置：</label>
          <tip class="ft14 mb20">
            为保证活动效果, 请为次活动配置1~6个奖品,未中奖默认为"谢谢参与"
          </tip>
          <table class="table">
            <thead>
            <tr>
              <th class="award-index">排序</th>
              <th class="award-img">图片</th>
              <th class="award-title">奖项</th>
              <th class="award-probability">中奖概率</th>
              <th class="award-limit">中奖限制</th>
              <th class="award-limit">保底人数</th>
              <th class="award-remaind">剩余奖品数</th>
              <th class="award-operate">操作</th>
            </tr>
            </thead>
            <tbody id="awardSort" class="ui-sortable" v-sortable="options">
            <tr v-for="(index, award) in prizes">
              <td class="td-first award-index">{{index + 1}}</td>
              <td class="thumbnail award-img">
                <img :src="award.logo">
              </td>
              <td class="title award-title">
                <p>{{award.description}}</p>
              </td>
              <td class="award-probability">
                <template v-if="award.rate">{{award.rate}}%</template>
                <template v-else>-</template>
              </td>
              <td class="award-limit">
                <template v-if="award.winLimit">{{award.winLimit}}次/每人</template>
                <template v-else>-</template>
              </td>
              <td class="award-remaind">
                <template v-if="award.minComein">{{award.minComein}}/人</template>
                <template v-else>-</template>
              </td>
              <td class="award-remaind">
                <template v-if="award.remainChange">{{award.remainChange}}</template>
                <template v-else>-</template>
              </td>
              <td class="operate award-operate">
                <a href="javascript:void(0)" class="iconhandle" @click="editAwardsModal(award, index)">&#xe601;</a>
                <a href="javascript:void(0)" v-if="params.awards.length !== 1" class="iconhandle delete" @click="deletAwardsModal(index)">&#xe61d;</a>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="add-award" v-if="prizes.length !== 8">
            <a href="javascript:void(0)" class="add-award-btn js-config-award" @click="addawardsModalClick"><i
                    class="iconhandle">&#xe61b;</i>添加奖品</a>
          </div>
          <p class="invalid" v-if="awardsValidate">{{awardsMessages}}</p>
          <p class="invalid" v-if="showisvalid">请修改奖项异常</p>
        </div>
      </div>
      <div class="form-groups-chunk">
        <h4>其它配置</h4>
        <div class="form-group cf">
          <label class="control-label">标签：</label>
          <div class="admintags fl">
          </div>
          <a class="btn btn-green btn-lg ml20 fl" @click="saveActivity">编辑</a>
        </div>
        <div class="form-group skins">
          <label class="control-label">归类：</label>
          <select class="select-control" v-model="params.freeScope">
            <option value="everyday">次/每天</option>
            <option value="forever">次/永久</option>
          </select>
        </div>
        <div class="form-group">
          <label class="control-label">直充防刷：</label>
          <dswitch :status.sync="params.anticheatExchangeLimit"></dswitch>
          <p class="switch-tip">
            <span>开启后，直充类奖项无法使用多个用户充值至一个充值账户</span>
          </p>
        </div>
      </div>

    </validator>
    <div class="form-group mt20">
      <a class="btn btn-green btn-lg mr20" @click="saveActivity">下一步</a>
      <a class="btn btn-default btn-lg" v-link="{ path: '/release' }">取消</a>
    </div>
  </div>
  <component :is="currentView" :show.sync="addawardsModal.show" :on-save="saveAwardsModal" :editdata="addawardsModal.award"
             :on-close="closeawardsModal" :defimg="defaultAwardImgs" :showpreview="data.showPreviewImg" :num="num" :subtype="params.subType" :images="getAwardImages()"></component>

  <component :is="addpromodalView" :show.sync="addpromodal.show" :on-save="saveProModal"
             :on-close="closeProModal" :itemobj="addpromodal.item" :pronum="pronum"></component>

  <component :is="oddsmodalView" :show.sync="addpromodal.show" :on-save="saveProModal"
             :on-close="closeOddsModal" :itemobj="addpromodal.item"></component>

  <confirmmodal :title="confirmModal.title" :show.sync="confirmModal.show" :type="confirmModal.type" :ok-text="confirmModal.oktext"  :desc="confirmModal.desc" :on-ok="confirmModal.action"></confirmmodal>
</template>
<script>
  import addgamemixins from '../components/AddCreditGameMixins';
  import validationMixins from 'components/utils/validationMixins';
  import addawardsmodal from '../components/AddawardsModal';
  import addpromodal from '../components/AddProbabilityModal';
  import addoddsmodal from '../components/AddOddsModal';
  import sortList from 'components/utils/sortList';

  export default {
    components: {
      addawardsmodal,
      addoddsmodal,
      addpromodal
    },
    mixins: [addgamemixins, validationMixins],
    route: {
      data: function(transition) {
        if (this.$route.path.indexOf('copy') !== -1) {
          this.actionType = 'copy';
        } else {
          if (this.$route.params.id) {
            this.actionType = 'edit';
          } else {
            this.actionType = 'add';
          }
        }
        this.getQuery(transition);
      }
    },
    data() {
      return {
        subtitle: '',
        tipText: '',
        currentView: '',
        addpromodalView: '',
        oddsmodalView: '',
        addpromodal: {
          show: false
        },
        confirmModal: {
          title: '删除奖项',
          desc: '确认要删除奖项？',
          oktext: '确定',
          type: 'delete',
          action: this.deletAwards,
          show: false
        },
        addawardsModal: {
          show: false
        }
      };
    },
    methods: {
      /**
       * 打开概率
       */
      addProModal: function(item, index) {
        this.getcPro();
        this.addpromodalView = 'addpromodal';
        this.addpromodal = {
          show: true,
          item: item,
          index: index
        };
      },
      /**
       * 关闭概率
       */
      closeProModal: function() {
        this.addpromodalView = '';
        this.addpromodal = {
          show: false
        };
      },
      /**
       * 保存概率
       */
      saveProModal: function(item) {
        this.params.valveConfig.splice(this.addpromodal.index, 1, item);
        this.closeProModal();
        this.closeOddsModal();
      },
      /**
       * 打开赔率
       */
      addOddsModal: function(item, index) {
        this.oddsmodalView = 'addoddsmodal';
        this.addpromodal = {
          show: true,
          item: item,
          index: index
        };
      },
      /**
       * 关闭赔率
       */
      closeOddsModal: function() {
        this.oddsmodalView = '';
        this.addpromodal = {
          show: false
        };
      },
      /**
       * 拖拽奖品排序
       */
      updateSort: function(event) {
        this.prizes = sortList(this.prizes, event.newIndex, event.oldIndex);
      },
      /**
       * 保存奖品
       */
      saveAwardsModal: function(item, flag) {
        if (flag) {
          this.params.awards.splice(this.addawardsModal.index, 1, item);
        } else {
          this.params.awards.push(item);
        }
      },
      /**
       * 删除奖品确认提示
       */
      deletAwardsModal: function(index) {
        this.confirmModal.show = true;
        this.confirmModal.index = index;
      },
      /**
       * 删除奖品
       */
      deletAwards: function() {
        this.params.awards.splice(this.confirmModal.index, 1);
        this.confirmModal.show = false;
      },
      /**
       * 编辑奖品
       */
      editAwardsModal: function(award, index) {
        this.getcCountnum();
        this.currentView = 'addawardsmodal';
        this.addawardsModal = {
          award: award,
          index: index,
          show: true
        };
      },
      /**
       * 关闭奖品对话框
       */
      closeawardsModal: function() {
        this.currentView = '';
        this.addawardsModal = {
          show: false
        };
      },

      /**
       * 获取当前所有奖品的图片，传给modal，判断不能重复
       */
      getAwardImages: function() {
        return this.params.awards.map((item) => {
          return item.img;
        });
      }
    }
  };
</script>
<style lang="less">
  .form-groups-chunk .stepprogress {
    width: 488px;
    margin: 0 auto;
  }
  .stepprogress .node {
    display: inline-block;
    line-height: 30px;
    float: left;
  }
  .stepprogress .node {
    display: inline-block;
    line-height: 30px;
    float: left;
  }
  .node .step-num {
    font-size: 18px;
    line-height: 28px;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #888;
    border-radius: 50%;
    color: #888;
    background-color: #fafafa;
  }
  .stepprogress .active {
    font-weight: 700;
  }
  .active .step-num {
    border: 1px solid #29b6b0;
    background-color: #29b6b0;
    color: #fff;
  }
  .stepprogress .line {
    float: left;
    width: 234px;
    height: 1px;
    margin: 14px 20px 0;
    background-color: #b8b8b8;
  }

  .form-group .table {
    margin-top: 10px;
  }
  .table thead tr {
    height: 30px;
    line-height: 30px;
    background: #E8E7E2;
    font-size: 12px;
    border: 1px solid #e5e5e5;
  th {
    font-weight: normal;
    text-align: left;
  }
  }
  .table .award-index {
    width: 30px;
    padding-left: 20px;
  }
  .table .award-img {
    width: 100px;
    text-align: center;
  }
  .table .award-title {
    width: 140px;
    vertical-align: middle;
  p{
    line-height: 1.5;
  }
  .invalid{
    margin: 0px;
  }
  }
  .table .award-probability {
    width: 90px;
  }
  .table .award-limit {
    width: 90px;
  }
  .table .award-remaind {
    width: 108px;
  }
  .table .award-show {
    width: 110px;
    position: relative;
  .iconhandle {
    color: #bbb;
    font-size: 12px;
    padding-left: 5px;;
    cursor: pointer;
  }
  }
  .table .award-operate {
    width: 86px;
  }
  .ui-sortable {
    border: 1px solid #e5e5e5;
    font-size: 14px;
  }
  .ui-sortable tr {
    cursor: move;
    height: 60px;
    line-height: 60px;
    background: #fff;
  &:hover {
     background-color: #f6fcfc;
   }
  .td-first {
    padding-left: 20px;
  }
  .thumbnail img {
    height: 50px;
    vertical-align: middle;
  }
  .operate .iconhandle {
    color: #bbb;
    margin-right: 20px;
  &:hover {
     color: #29b6b0;
   }
  &.delete:hover {
     color: #ff795c;
   }
  }
  td {
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
  }
  }
  .showPreviewImg{
    position: absolute;
    background-color: #fff;
    border: 1px solid #e9e9e9;
    padding: 3px;
    z-index: 1;
    top: -273px;
    right: 72px;
  img{
    vertical-align: middle;
  }
  &:before,&:after{
              content: '';
              display: block;
              position: absolute;
              border: 5px solid transparent;
              bottom: 30px;
            }
  &:before{
     border-left-color: #e9e9e9;
     right: -9px;
   }
  &:after{
     border-left-color: #fff;
     right: -8px;
   }
  }
  .form-group .add-award {
    border: 1px solid #e5e5e5;
    border-top: 0;
    height: 60px;
    line-height: 60px;
    background: #fff;
  .add-award-btn {
    color: #444;
    padding-left: 20px;
  .iconhandle {
    padding-right: 5px;
  }
  &:hover {
     color: #29b6b0;
   }
  }
  }
  .radio-group .iconhandle {
    color: #bbb;
  }
  .radio-group .tooltip.right {
    width: 135px;
    border-radius:6px;
  }
  .radio-group .tooltip.right {
  &:before{
     position: absolute;
     content: ' ';
     width: 0;
     height: 0;
     border-color: transparent;
     border-style: solid;
     top: 50%;
     left: 0;
     margin-top: -5px;
     border-width: 5px 5px 5px 0;
     border-right-color: #ccc;
   }
  }
  .radio-group .tooltip.right .tooltip-arrow{
    border-right-color: #fff;
    left: 1px;
  }
  .radio-group .tooltip.right .tooltip-inner{
    border:1px solid #ccc;
    background:#fff;
    text-align: left;
    border-radius: 6px;
    color: #444;
  }
  .radio-group .rright {
    margin-right: 5px;
  }
  .skins .select-control{
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-sizing: border-box;
    background: #fff;
    width: 200px;
  }
  .infodata .tr-items td{
    border: 1px solid #ebebeb;
    text-align: center;
  }
  .infodata .tr-items td p {
    position: relative;
    .iconhandle {
      position: absolute;
      top: -4px;
      right: 5px;
      &:hover {
        color: #29b6b0;
      }
    }
  }
  .infodata .tr-header th{
    text-align: center;
  }
  .form-group .admintags{
    width: 500px;
    display: table;
    height: 34px;
  }
</style>
