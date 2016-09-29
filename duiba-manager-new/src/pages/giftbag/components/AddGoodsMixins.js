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
    let params = {
      id: '',
      prizeName: '',
      itemId: '',
      remain: '',
      remainChange: '',
      max: '',
      description: ''
    };
    if (this.itemobj) {
      params = ObjectAssign(params, this.itemobj);
    }
    params.remainChange = params.remain;
    return {
      params: params,
      hasSubmited: false,
      awsearchlist: false,
      obj: {},
      fields: {
        prizename: {
          required: {
            rule: true,
            message: '选择优惠券'
          }
        },
        remainchange: {
          required: {
            rule: true,
            message: '请填写剩余商品'
          },
          pattern: {
            rule: '/^[0-9][0-9]*$/',
            message: '请填写整数'
          },
          min: {
            rule: 0,
            message: '剩余商品数必须大于0'
          },
          max: {
            rule: 99999,
            message: '剩余商品数不得超过99999'
          }
        }
      }
    };
  }
};
