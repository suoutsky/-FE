<template>
  <div class="pagination">
    <template v-if="lottery">
    <div class="lottery">
      <slot name="lottery-btns">
      </slot>
    </div>
    </template>
    <template v-else>
      <div class="batch-action" v-if="batch">
        <dcheckbox :checked.sync="all" @click="oncheckChange(all)"></dcheckbox>
        <span>已选择{{selected}}/{{totalCount + batchName}}</span>
        <slot name="batch-btns">
        </slot>
      </div>
      <div class="total-count" v-else>共{{totalCount}}条</div>
    </template>
    <ul class="pagination-list">
      <!-- <li v-show="!pages[0].selected">
        <a href="javascript:void(0)" class="num iconhandle" @click="getData('prev', $event)">&#xe612;</a>
      </li> -->
      <li v-for="page in pages">
        <template v-if="page.display === 'prev'">
          <a href="javascript:void(0)" class="num iconhandle" @click="getData('prev', $event)">&#xe612;</a>
        </template>
        <template v-else>
          <template v-if="page.display === 'point'">
            <span class="point">...</span>
          </template>
          <template v-else>
            <template v-if="page.display === 'next'">
              <a href="javascript:void(0)" class="num iconhandle" @click="getData('next', $event)">&#xe619;</a>
            </template>
            <template v-else>
              <a href="javascript:void(0)" class="num" v-bind:class="{selected: page.selected}" @click="getData(page.id, $event)">{{page.display}}</a>
            </template>
          </template>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';
import coerceNumber from '../utils/coerceNumber.js';
import dcheckbox from '../forms/DCheckbox';

export default {
  props: {
    totalCount: {
      required: true,
      type: Number
    },
    pages: {
      required: true,
      type: Array
    },
    onChange: {
      required: true,
      type: Function
    },
    batch: {
      type: Boolean,
      default: false,
      coerce: coerceBoolean
    },
    lottery: {
      type: Boolean,
      default: false,
      coerce: coerceBoolean
    },
    batchName: {
      type: String,
      default: ''
    },
    selected: {
      twoWay: true,
      type: Number,
      coerce: coerceNumber,
      default: 0
    },
    all: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    oncheckChange: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    dcheckbox
  },
  methods: {
    getData: function(index, event) {
      this.onChange(index);
    }
  }
};
</script>
