<template>
  <modal :title="title" :show.sync="show" :on-ok="onConfirm">
    <template slot="modal-body">
      <div class="modal-body">
        <p>
          当前选中的商品<span class="fw-b">{{selectedLen}}</span>个，可<span v-if="type === 'up'">上架</span><span v-else>添加</span><span class="c-green">{{canAdd}}</span>个。
        </p>
      </div>
    </template>
  </modal>
</template>

<script>
import coerceBoolean from 'components/utils/coerceBoolean.js';
import coerceNumber from 'components/utils/coerceNumber.js';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true,
      coerce: coerceBoolean,
      default: false
    },
    type: {
      type: String
    },
    selectedLen: {
      type: Number,
      required: true,
      coerce: coerceNumber
    },
    canAdd: {
      type: Number,
      required: true,
      coerce: coerceNumber
    },
    onOk: {
      type: Function,
      required: true
    }
  },

  methods: {
    onConfirm: function() {
      this.onOk(this.type);
    }
  }
};
</script>
