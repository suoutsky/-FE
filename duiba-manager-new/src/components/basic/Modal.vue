<template>
  <div role="dialog"
    v-bind:class="{
    'modal': true,
    'fade': effect === 'fade',
    'message-box': isMessage,
    'delete': type === 'delete'
    }"
    >
    <div class="modal-dialog" role="document" v-bind:style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header" v-if="!isMessage">
          <div class="modal-header">
            <i class="iconhandle close" @click="close">&#xe609;</i>
            <h4 class="modal-title" >
              <slot name="title">
                {{title}}
              </slot>
            </h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body">
            <template v-if="isMessage">
              <p v-if="messageType === 'success'">
                <i class="iconhandle success">&#xe629;</i>
                {{title}}
              </p>
              <p v-else>
                <i class="iconhandle error">&#xe605;</i>
                {{title}}
              </p>
            </template>
          </div>
        </slot>
        <slot name="modal-footer" v-if="footer">
          <div class="modal-footer">
            <a class="btn btn-green btn-pd-lg mr15" v-bind:class="{'btn-orange': type === 'delete'}" @click="onOk">{{ okText }}</a>
            <a class="btn btn-default btn-pd-lg" @click="close">{{ cancelText }}</a>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import getScrollBarWidth from '../utils/getScrollBarWidth.js';
import EventListener from '../utils/EventListener.js';
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  props: {
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      require: true,
      type: Boolean,
      coerce: coerceBoolean,
      twoWay: true
    },
    width: {
      default: 300
    },
    onOk: {
      type: Function,
      default() {}
    },
    effect: {
      type: String,
      default: null
    },
    backdrop: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    footer: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    isMessage: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    messageType: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    onClose: {
      default: null
    }
  },
  ready() {
    this.$watch('show', (val) => {
      const el = this.$el;
      const body = document.body;
      const scrollBarWidth = getScrollBarWidth();

      if (val) {
        el.querySelector('.modal-content').focus();
        el.style.display = 'block';
        setTimeout(() => el.classList.add('in'), 0);
        body.classList.add('modal-open');

        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px';
        }

        if (this.backdrop) {
          this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e) => {
            if (e.target === el) {
              if (this.onClose) {
                this.onClose();
                return;
              } else {
                this.show = false;
              }
            }
          });
        }
      } else {
        if (this._blurModalContentEvent) this._blurModalContentEvent.remove();

        el.classList.remove('in');
        setTimeout(() => {
          el.style.display = 'none';
          body.classList.remove('modal-open');
          body.style.paddingRight = '0';
        }, 300);
      }
    }, { immediate: true });
  },
  computed: {
    optionalWidth() {
      if (this.width === null) {
        return null;
      } else if (Number.isInteger(+this.width)) {
        return this.width + 'px';
      }

      return this.width;
    }
  },
  methods: {
    close() {
      if (this.onClose) {
        this.onClose();
        return;
      }
      this.show = false;
    }
  },
  destroyed() {
    if (this._blurModalContentEvent) {
      this._blurModalContentEvent.remove();
    }
  }
};
</script>
