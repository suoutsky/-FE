import coerceBoolean from 'components/utils/coerceBoolean.js';
import ObjectAssign from 'object-assign';

export default {
  props: {
    title: {
      required: true,
      type: String
    },
    defimg: {
      default: null
    },
    editdata: {
      default: null
    },
    subtype: {
      default: null
    },
    onClose: {
      default: null
    },
    onSave: {
      default: null
    },
    num: {
      default: null
    },
    showpreview: {
      default: null
    },
    onOk: {
      type: Function,
      default() {}
    },
    images: {
      type: Array,
      default: () => {
        return [];
      }
    },
    awardtype: {
      default: () => {
        return [{
          id: 'coupon',
          label: '优惠券'
        }, {
          id: 'object',
          label: '实物商品'
        }, {
          id: 'virtual',
          label: '虚拟商品'
        }, {
          id: 'phonebill',
          label: '话费充值'
        }, {
          id: 'alipay',
          label: '支付宝充值'
        }, {
          id: 'qb',
          label: 'Q币充值'
        }, {
          id: 'lucky',
          label: '幸运奖'
        }, {
          id: 'again',
          label: '再抽一次'
        }, {
          id: 'thanks',
          label: '谢谢参与'
        }];
      }
    },
    tab: {
      default: () => {
        return {
          uploadTip: '尺寸为250*250px，格式为jpg、png',
          width: 250,
          height: 250,
          imageUrl: ''
        };
      }
    },
    show: {
      required: true,
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    }
  },
  data() {
    let params = {
      type: '',
      title: '',
      img: '',
      description: '',
      show: true,
      appItemId: '',
      arealimit: false,
      value: '',
      probability: '',
      limit: '',
      low: '',
      name: '',
      valid: true,
      remaind: '',
      oldRemaind: null
    };
    let btnvalid = false;
    let awardtip = false;
    let ishide = false;
    let countnum = 100;
    if (this.editdata) {
      if (!this.editdata.valid) {
        this.restParams();
        btnvalid = false;
      } else {
        params = ObjectAssign(params, this.editdata);
        if (!params.description) {
          params.description = '';
        }
        btnvalid = true;
        if (params.arealimit) {
          awardtip = true;
        }
      }

      this.tab.imageUrl = params.img;

      let oldprobability = this.editdata.probability ? parseFloat(this.editdata.probability) : 0;

      countnum = countnum - (this.num - oldprobability);
    } else {
      countnum = countnum - this.num;
    }
    countnum = countnum.toFixed(2);
    if (this.subtype === 'tiger' || this.subtype === 'smashg') {
      ishide = true;
    }
    return {
      imageIsRepeat: false,
      params: params,
      pendingSuccessToolbar: {
        createLink: true
      },
      data: {},
      virtual: {},
      hasSubmited: false,
      ishide: ishide,
      islazy: false,
      awardtip: awardtip,
      btnvalid: btnvalid,
      obj: {},
      countnum: countnum,
      awsearchlist: false,
      fields: {
        type: {
          required: {
            rule: true,
            message: '请选择奖品'
          }
        },
        value: {
          required: {
            rule: true,
            message: '请输入兑换项'
          }
        },
        coupon: {
          required: {
            rule: true,
            message: '请输入兑换项'
          }
        },
        virtual: {
          required: {
            rule: true,
            message: '请选商品'
          }
        },
        phonebill: {
          required: {
            rule: true,
            message: '请选择充值金额'
          }
        },
        alipay: {
          required: {
            rule: true,
            message: '请填写面额'
          },
          min: {
            rule: 1,
            message: '面额不能小于1'
          },
          max: {
            rule: 99999,
            message: '面额不能大于99999'
          },
          pattern: {
            rule: '/^[1-9][0-9]*$/',
            message: '请填写整数'
          }
        },
        qb: {
          required: {
            rule: true,
            message: '请填写面额'
          },
          min: {
            rule: 1,
            message: '面额不能小于1'
          },
          max: {
            rule: 99999,
            message: '面额不能大于99999'
          },
          pattern: {
            rule: '/^[1-9][0-9]*$/',
            message: '请填写整数'
          }
        },
        imageUrl: {
          required: {
            rule: true,
            message: '请上传奖品图片'
          }
        },
        title: {
          required: {
            rule: true,
            message: '请填写奖品信息'
          },
          maxlength: {
            rule: 6,
            message: '奖品信息最多为6个字'
          }
        },
        remaind: {
          required: {
            rule: true,
            message: '请填写剩余奖品数'
          },
          pattern: {
            rule: '/^[0-9][0-9]*$/',
            message: '请填写整数'
          },
          min: {
            rule: 0,
            message: '剩余奖品数必须大于0'
          },
          max: {
            rule: 99999,
            message: '剩余奖品数不得超过99999'
          }
        },
        probability: {
          required: {
            rule: true,
            message: '请填写中奖概率'
          },
          min: {
            rule: 0,
            message: '中奖概率不能小于0'
          },
          max: {
            rule: 100,
            message: '中奖几率总和为100，当前概率不能超过100'
          },
          pattern: {
            rule: '/^[0-9]+(\.[0-9]{0,2})?$/',
            message: '最多只能有2位小数'
          }
        },
        prolucky: {
          required: {
            rule: true,
            message: '请填写中奖概率'
          },
          min: {
            rule: 0,
            message: '中奖概率不能小于0'
          },
          max: {
            rule: 100,
            message: '中奖几率总和为100，当前概率不能超过100'
          },
          pattern: {
            rule: '/^[0-9]+(\.[0-9]{0,2})?$/',
            message: '最多只能有2位小数'
          }
        },
        proagain: {
          required: {
            rule: true,
            message: '请填写中奖概率'
          },
          min: {
            rule: 0,
            message: '中奖概率不能小于0'
          },
          max: {
            rule: 100,
            message: '中奖几率总和为100，当前概率不能超过100'
          },
          pattern: {
            rule: '/^[0-9]+(\.[0-9]{0,2})?$/',
            message: '最多只能有2位小数'
          }
        },
        limit: {
          min: {
            rule: 0,
            message: '中奖限制次数必须大于0'
          },
          max: {
            rule: 99999,
            message: '中奖限制次数不得超过99999'
          },
          pattern: {
            rule: '/(^[1-9]+[0-9]*)$|(^$)/',
            message: '请填写整数'
          }
        },
        low: {
          min: {
            rule: 0,
            message: '保底人数必须大于0'
          },
          max: {
            rule: 99999,
            message: '保底人数不得超过99999'
          },
          pattern: {
            rule: '/(^[1-9]+[0-9]*)$|(^$)/',
            message: '请填写整数'
          }
        }
      },
      showPeview: false
    };
  },
  methods: {
    /**
     * 获取添加奖品配置
     */
    getObtain: function() {
      let params = {
        appId: duiba.appId
      };
      this.$http.post('/launch/obtain', params).then((res) => {
        res = res.json();
        if (res.success) {
          this.$set('data', res.data);
          if (this.params.type === 'virtual') {
            this.virtualFun(this.params.appItemId);
          }
          this.$activateValidator();
          this.islazy = true;
        }
      }, (res) => {

      });
    },
    /**
     * 虚拟商品
     */
    virtualFun: function(appItemId) {
      this.virtual = this.data.virtualList.find((f) => {
        return f.appItemId === appItemId;
      });
    },
    /**
     * 图片显示
     */
    showPeviewenter: function() {
      this.showPeview = true;
    },
    /**
     * 图片显示
     */
    showPeviewleave: function() {
      this.showPeview = false;
    },
    /**
     * 选择兑换项
     * @param item
     */
    selectObj: function(item) {
      this.params.name = item.title;
      this.params.appItemId = item.appItemId;
      this.params.arealimit = item.arealimit;
      this.awsearchlist = false;
      this.fields.remaind.max.rule = item.remaing;
      this.fields.remaind.max.message = '剩余奖品数不得超过' + item.remaing;
      if (item.arealimit) {
        this.awardtip = true;
      } else {
        this.awardtip = false;
      }
    },
    /**
     * 条件重置
     */
    restParams: function() {
      this.params = {
        type: '',
        title: '',
        arealimit: false,
        img: '',
        description: '',
        appItemId: '',
        value: '',
        probability: '',
        limit: '',
        name: '',
        low: '',
        show: true,
        valid: true,
        remaind: '',
        oldRemaind: null
      };
      this.tab.imageUrl = '';
    }
  }
};
