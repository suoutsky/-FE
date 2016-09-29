<template>
  <modal :title="rules.title" effect="fade" :show.sync="show" width="500" footer="false" class="rule-modal">
    <div slot="modal-body" class="modal-body">
      <template v-if="rules.limit">
        <p class="rule-tip" v-if="rules.limit.credits != null && +rules.limit.credits !== 0">
          抽奖积分：<span class="c-green">{{rules.limit.credits}}</span>积分/次
        </p>
        <template v-if="rules.limit.freeLimit != null && +rules.limit.freeLimit !== 0">
          <p class="rule-tip" v-if="rules.limit.freeScope === 'everyday'">
            每个用户<b>每天免费</b>抽奖<span class="num">{{rules.limit.freeLimit}}</span>次
          </p>
          <p class="rule-tip" v-else>
            每个用户<b>免费</b>抽奖<span class="num">{{rules.limit.freeLimit}}</span>次
          </p>
        </template>
        <template v-if="rules.limit.drawLimit != null && +rules.limit.drawLimit !== 0">
          <p class="rule-tip" v-if="rules.limit.drawScope === 'everyday'">
            每个用户<b>每天最多</b>抽奖<span class="num">{{rules.limit.drawLimit}}</span>次
          </p>
          <p class="rule-tip" v-else>
            每个用户<b>最多</b>抽奖<span class="num">{{rules.limit.freeLimit}}</span>次
          </p>
        </template>
        <p class="rule-tip" v-if="rules.limit.winLimit != null && +rules.limit.winLimit !== 0">
          每个用户<b>最多中大奖</b><span class="num">{{rules.limit.winLimit}}</span>次
        </p>
        <p class="rule-tip" v-if="rules.limit.totalWinLimit != null && +rules.limit.totalWinLimit !== 0">
          每天<b>最多累计</b>中奖<span class="num">{{rules.limit.totalWinLimit}}</span>次
        </p>
      </template>
      <div class="header">
        <table>
          <template v-if="+type === 0">
            <tr class="tr-header">
              <th class="rule-award">奖品</th>
              <th class="rule-price">兑换价格</th>
              <th class="rule-percent">中奖概率</th>
              <th class="rule-pay">成本(元)</th>
            </tr>
          </template>
          <template v-else>
            <tr class="tr-header" v-if="+type === 30">
              <th class="rule-award">奖品</th>
              <th class="rule-percent">兑换价格</th>
              <th class="rule-pay rule-pay-short">成本(元)</th>
            </tr>
            <tr class="tr-header" v-else>
              <th class="rule-award">奖品</th>
              <th class="rule-percent">中奖概率</th>
              <th class="rule-pay rule-pay-short">成本(元)</th>
            </tr>
          </template>
        </table>
      </div>
      <div class="tbody-container">
        <table class="tbody">
          <template v-if="+type === 0">
            <tr class="tr-items" v-for="item in rules.content">
              <td class="rule-award">{{item.title}}</td>
              <td class="rule-price">{{item.conversion}}</td>
              <td class="rule-percent">{{item.rate}}</td>
              <td class="rule-pay">
                <span class="c-green" v-if="item.cost === '免费'">{{item.cost}}</span>
                <span v-else>{{item.cost}}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <template v-if="+type === 30">
              <tr class="tr-items" v-for="item in rules.content">
                <td class="rule-award">{{item.title}}</td>
                <td class="rule-price">{{item.conversion}}</td>
                <td class="rule-pay rule-pay-short">
                  <span class="c-green" v-if="item.cost === '免费'">{{item.cost}}</span>
                  <span v-else>{{item.cost}}</span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr class="tr-items" v-for="item in rules.content">
                <td class="rule-award">{{item.title}}</td>
                <td class="rule-percent">{{item.rate}}</td>
                <td class="rule-pay rule-pay-short">
                  <span class="c-green" v-if="item.cost === '免费'">{{item.cost}}</span>
                  <span v-else>{{item.cost}}</span>
                </td>
              </tr>
            </template>
          </template>
        </table>
      </div>
    </div>
  </modal>
</template>

<script>
import coerceBoolean from 'components/utils/coerceBoolean.js';
import modal from '../basic/Modal';

export default {
  components: {
    modal
  },

  props: {
    rules: {
      required: true,
      type: Object
    },
    show: {
      required: true,
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    type: {
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.rule-modal {
  .rule-tip {
    font-size: 14px;
    color: #444;
    line-height: 1.5;

    b {
      font-weight: bold;
    }

    .num {
      color: #29b6b0;
      margin: 0 5px;
    }
  }

  .header {
    margin: 15px 0 10px;
  }

  .tbody-container {
    max-height: 200px;
    overflow-y: scroll;
  }

  .tbody {
    border: 1px solid #ebebeb;
    border-bottom: 0;
    text-align: left;
  }

  .rule-award {
    width: 35%;
  }

  .rule-price,
  .rule-percent {
    width: 25%;
  }

  .rule-pay-short {
    width: 20%;
  }
}
</style>
