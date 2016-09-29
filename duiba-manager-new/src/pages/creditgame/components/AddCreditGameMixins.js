import ObjectAssign from 'object-assign';
import messagebox from 'components/basic/MessageBox';
export default {
  data() {
    return {
      data: {},
      actionType: 'add',
      subtitle: '创建“胜负平游戏"',
      imagesTabs: {
        bannerImage: {
          title: '首页Banner',
          warnTip: '展示在首页Banner区的图片',
          uploadTip: '尺寸为640*280像素，格式为jpg、png、jepg，图片大小不可大于1M。',
          width: 640,
          required: true,
          height: 280,
          imageUrl: ''
        },
        smallImage: {
          title: '缩略图',
          warnTip: '手机端首页单列、双列布局、及抽奖活动列表里使用的图片',
          uploadTip: '尺寸为225*140像素,格式为jpg、png、jepg。',
          width: 225,
          required: true,
          height: 140,
          imageUrl: ''
        },
        whiteImage: {
          title: '缩略图（白底）',
          warnTip: '手机端首页单列、双列布局、及抽奖活动列表里使用的图片【透明】',
          uploadTip: '尺寸为225*140像素,格式为jpg、png、jepg。',
          width: 225,
          height: 140,
          required: true,
          imageUrl: ''
        },
        recommendImage: {
          title: '推荐横幅图',
          warnTip: '展示推荐位横幅图片',
          uploadTip: '620*160像素,格式为jpg、png、jepg。',
          width: 620,
          height: 160,
          imageUrl: ''
        }
      },
      options: {
        onUpdate: this.updateSort
      },
      defaultAwardImgs: {
        'phonebill': 'https://yun.duiba.com.cn/upload/AROxS1462438316966.png',
        'alipay': 'https://yun.duiba.com.cn/upload/KkZMp1462438317113.png',
        'qb': 'https://yun.duiba.com.cn/upload/mF3wO1462438317114.png',
        'object': 'https://yun.duiba.com.cn/upload/1uF0l1462438316968.png',
        'coupon': 'https://yun.duiba.com.cn/upload/bust51462438317113.png',
        'again': 'https://yun.duiba.com.cn/upload/aJwb11462438317113.png',
        'thanks': 'https://yun.duiba.com.cn/upload/uP99F1462438316972.png'
      },
      prizes: [{
        'activityId': duiba.gameId,
        'logo': 'https://yun.duiba.com.cn/upload/uP99F1462438316972.png',
        'description': '谢谢参与',
        'ctivityType': '46',
        'prizeType': 'thanks'
      }],
      skins: [],
      cates: [],
      valve1: [
        {
          'id': 'win',
          'label': '胜',
          'probability': 0,
          'odds': []
        },
        {
          'id': 'lose',
          'label': '负',
          'probability': 0,
          'odds': []
        },
        {
          'id': 'draw',
          'label': '平',
          'probability': 0,
          'odds': []
        }
      ],
      valve2: [
        {
          'id': 'win',
          'label': '胜',
          'probability': 0,
          'odds': []
        },
        {
          'id': 'lose',
          'label': '负',
          'probability': 0,
          'odds': []
        }
      ],
      params: {
        id: duiba.gameId,
        title: '',
        drawLimit: '',
        drawScope: 'everyday',
        freeLimit: '',
        freeScope: 'everyday',
        skinId: '',
        lotteryCount: '',
        betConfig: {
          bet1: '',
          bet2: '',
          bet3: ''
        },
        valveConfig: [],
        autoOffDate: '',
        bannerImage: '',
        recommendImage: '',
        smallImage: '',
        whiteImage: '',
        switches: '',
        customTag: [],
        activityCategoryId: '',
        anticheat: false
      },
      fields: {
        title: {
          required: {
            rule: true,
            message: '请填写活动标题'
          },
          maxlength: {
            rule: 20,
            message: '活动标题最多为20个字'
          }
        }
      }
    };
  },
  methods: {
    dateformat: function(value) {
      let curdate = new Date(value);
      let year = curdate.getFullYear();
      let month = curdate.getMonth() + 1;
      let day = curdate.getDate();
      let hours = curdate.getHours();
      let min = curdate.getMinutes();

      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      hours = hours > 9 ? hours : '0' + hours;
      min = min > 9 ? min : '0' + min;

      return year + '-' + month + '-' + day + ' ' + hours + ':' + min;
    },
    /**
     * 获取获取初始配置
     * @param transition
     */
    getQuery: function() {
      let id = '';
      if (this.actionType !== 'add') {
        id = this.$route.params.id;
      } else {
        id = duiba.gameId;
      }
      let params = {
        id: id
      };
      this.$http.post('/creditGame/query', params).then((res) => {
        res = res.json();
        if (res.success) {
          let dataobj = res.data;
          let params = {};

          this.skins = dataobj.skins;
          this.cates = dataobj.cates;

          if (this.actionType !== 'add') {
            params = {
              id: duiba.gameId,
              title: dataobj.title,
              drawLimit: dataobj.drawLimit,
              drawScope: dataobj.drawScope,
              freeLimit: dataobj.freeLimit,
              freeScope: dataobj.freeScope,
              skinId: dataobj.skinId,
              lotteryCount: dataobj.lotteryCount,
              betConfig: JSON.parse(dataobj.betConfig),
              valveConfig: JSON.parse(dataobj.valveConfig),
              autoOffDate: this.dateformat(dataobj.autoOffDate),
              bannerImage: dataobj.bannerImage,
              recommendImage: dataobj.recommendImage,
              smallImage: dataobj.smallImage,
              whiteImage: dataobj.whiteImage,
              switches: dataobj.switches,
              customTag: JSON.parse(dataobj.customTag),
              activityCategoryId: dataobj.activityCategoryId,
              anticheat: dataobj.anticheat
            };

            this.params = ObjectAssign(this.params, params);
          } else {
            if (dataobj.type === 1) {
              this.params.valveConfig = this.valve1;
            } else if (dataobj.type === 2) {
              this.params.valveConfig = this.valve2;
            }
            this.params.bannerImage = dataobj.bannerImage;
            this.params.recommendImage = dataobj.recommendImage;
            this.params.smallImage = dataobj.smallImage;
            this.params.whiteImage = dataobj.whiteImage;
            this.imagesTabs.bannerImage.imageUrl = dataobj.bannerImage;
            this.imagesTabs.recommendImage.imageUrl = dataobj.recommendImage;
            this.imagesTabs.smallImage.imageUrl = dataobj.smallImage;
            this.imagesTabs.whiteImage.imageUrl = dataobj.whiteImage;
            this.params.switches = dataobj.switches;
          }
        } else {
          messagebox({
            title: '获取配置错误！',
            type: 'error'
          });
        }
      }, (res) => {
        messagebox({
          title: '获取配置错误！',
          type: 'error'
        });
      });
    },
    /**
     * 保存活动
     */
    saveActivity: function() {
      if (this.$validator.invalid) {
        this.hasSubmited = true;
        this.$setValidationErrors(this.$validator.errors);
        return;
      }
      this.getcCountnum();
      if (!this.isvalid) {
        this.showisvalid = true;
        setTimeout(() => {
          this.showisvalid = false;
        }, 1000);
        return;
      }
      if (this.params.awards.length < this.data.minawards) {
        this.awardsValidate = true;
        this.awardsMessages = '请正确配置奖品数量';
        setTimeout(() => {
          this.awardsValidate = false;
        }, 2000);
        return;
      }
      if (this.minthanks) {
        this.awardsValidate = true;
        this.awardsMessages = '请最少配置一个“谢谢参与”';
        setTimeout(() => {
          this.awardsValidate = false;
        }, 2000);
        return;
      }
      let _data = this.params.awards.map((item) => {
        return item.type;
      });
      let _unique = this.unique(_data);
      if (_unique.length < this.data.minDifferentAwards) {
        this.awardsValidate = true;
        this.awardsMessages = '请最少配置' + this.data.minDifferentAwards + '种不同种类的奖品';
        setTimeout(() => {
          this.awardsValidate = false;
        }, 2000);
        return;
      }

      let param = ObjectAssign({}, this.params);

      if (param.creditsType === '0') {
        param.credits = '';
        param.freeLimit = '';
      }

      param.appId = duiba.appId;
      param.banner = this.imagesTabs.banner.imageUrl;
      param.thumbnail = this.imagesTabs.thumbnail.imageUrl;

      param.awards = JSON.stringify(param.awards);

      this.$http.post('/launch/save', param).then((res) => {
        res = res.json();
        if (res.success) {
          this.$router.go({
            name: 'setHdtool',
            params: {
              type: param.subType,
              actid: res.data.actId
            }
          });
        } else {
          messagebox({
            title: '保存失败！',
            type: 'error'
          });
        }
      }, (res) => {
        messagebox({
          title: '保存失败！',
          type: 'error'
        });
      });
    },
    unique: function(array) {
      array.sort();
      let re = [array[0]];
      for (let i = 1; i < array.length; i++) {
        if (array[i] !== re[re.length - 1]) {
          re.push(array[i]);
        }
      }
      return re;
    },
    /**
     * 获取中奖概率 和 奖项是否异常
     */
    getcCountnum: function() {
      let editdata = this.params.awards;
      let dataLen = editdata.length;
      this.isvalid = true;
      this.minthanks = true;
      let num = 0;
      for (let i = 0; i < dataLen; i++) {
        let probability = editdata[i].probability ? parseFloat(editdata[i].probability) : 0;
        num += probability;
        if (!editdata[i].valid && this.isvalid) {
          this.isvalid = false;
        }
        if (editdata[i].type === 'thanks' && this.minthanks) {
          this.minthanks = false;
        }
      }
      this.num = num;
    },
    getcPro: function() {
      let valveConfig = this.params.valveConfig;
      let dataLen = valveConfig.length;
      let num = 0;
      for (let i = 0; i < dataLen; i++) {
        let probability = valveConfig[i].probability ? parseFloat(valveConfig[i].probability) : 0;
        num += probability;
      }
      this.pronum = num;
    }
  }
};
