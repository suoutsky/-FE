<template>
  <pagetitle title="游戏礼包"></pagetitle>
  <div class="page-content">
      <a href="javascript:void(0)" class="btn btn-default" @click="openAddgoodsmodel">+添加商品</a>
      <table class="mt20">
          <thead>
              <tr class="tr-header">
                  <template v-for="column in columns">
                      <th v-bind:class="column.className" v-bind:style="{width: column.width + '%'}">
                          {{column.title}}
                      </th>
                  </template>
              </tr>
          </thead>
          <tbody>
              <tr class="tr-items" v-for="(index, item) in data.list">
                      <td>{{index + 1}}</td>
                      <td>{{item.prizeName}}</td>
                      <td>{{item.remain}}</td>
                      <td><a href="#" class="btn btn-default" @click="openAddgoodsmodel(item, index)">编辑</a><a href="javascript:;" @click="delelegiftModal(item)" class="btn btn-default">删除</a></td>
              </tr>
          </tbody>
      </table>
    <pagination v-if="data && data.pagination" :total-count="data.pagination.totalCount" :pages="data.pagination.pages" :on-change="paginationChange">
    </pagination>
  </div>
<component :is="addgoodsmodelView" :show.sync="addmodal.show" :on-save="saveAddgoodsmodel"
           :on-close="closeAddgoodsmodel" :itemobj="addmodal.item"></component>
<confirmmodal :title="confirmModal.title" :show.sync="confirmModal.show" :type="confirmModal.type"
              :ok-text="confirmModal.oktext"  :desc="confirmModal.desc" :on-ok="confirmModal.action"></confirmmodal>

</template>
<script>
  import messagebox from 'components/basic/MessageBox';
  import addgoodsmodel from '../components/AddGoodsModel';
  import confirmmodal from '../components/ConfirmModal';
  const columns = [
    {
      title: '编号',
      dataIndex: 'num'
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '剩余数量',
      dataIndex: 'residueNum'
    },
    {
      title: '操作',
      dataIndex: 'operate'
    }
  ];
  export default {
    components: {
      confirmmodal,
      addgoodsmodel
    },

    route: {
      data: function(transition) {
        this.getGiftBag(transition);
      }
    },
    data() {
      return {
        columns: columns,
        addgoodsmodelView: '',
        addmodal: {
          show: false
        },
        confirmModal: {
          show: false
        },
        params: {
          currentPage: 1
        },
        data: {}
      };
    },

    methods: {
      /**
       * 获取礼包列表
       */
      getGiftBag: function(transition) {
        this.$http.get('/gift/gift_list', {
          params: this.params
        }).then((res) => {
          res = res.json();
          if (res.success) {
            if (transition) {
              transition.next({
                'data': res.data
              });
            } else {
              this.$set('data', res.data);
            }
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
      },
      /**
      *打开添加商品
      */
      openAddgoodsmodel: function(item) {
        this.addgoodsmodelView = 'addgoodsmodel';
        if (!item) {
          this.addmodal = {
            show: true
          };
        } else {
          this.addmodal = {
            show: true,
            item: item
          };
        }
      },
      /**
      *删除礼品
      */
      delelegift: function() {
        let param = {
          id: this.confirmModal.item.id
        };

        this.$http.post('/gift/gift_delete', param).then((res) => {
          res = res.json();
          if (res.success) {
            this.getGiftBag();
            this.confirmModal = {
              show: false
            };
          } else {
            messagebox({
              title: '删除失败！',
              type: 'error'
            });
          }
        }, (res) => {
          messagebox({
            title: '删除失败！',
            type: 'error'
          });
        });
      },
      /**
       * 分页
       */
      paginationChange: function(index) {
        // 当前页不发送请求
        if (+index === this.params.currentPage) {
          return;
        }

        if (index === 'prev') {
          this.params.currentPage -= 1;
        } else if (index === 'next') {
          this.params.currentPage += 1;
        } else {
          this.params.currentPage = +index;
        }
        this.getGiftBag();
      },
      /**
      *删除礼品
      */
      delelegiftModal: function(item) {
        this.confirmModal = {
          title: '删除礼包',
          desc: '确认要删除礼包？',
          oktext: '删除',
          type: 'delete',
          item: item,
          action: this.delelegift,
          show: true
        };
      },
      /**
       * 保存添加商品
       */
      saveAddgoodsmodel: function(goods) {
        let param = {
          id: goods.id,
          itemId: goods.itemId,
          description: goods.description,
          remain: goods.remain,
          remainChange: goods.remainChange
        };

        this.$http.post('/gift/gift_save', param).then((res) => {
          res = res.json();
          if (res.success) {
            this.getGiftBag();
          } else {
            messagebox({
              title: '添加失败！',
              type: 'error'
            });
          }
        }, (res) => {
          messagebox({
            title: '添加失败！',
            type: 'error'
          });
        });
      },
      /**
      *关闭添加商品
      */
      closeAddgoodsmodel: function() {
        this.addgoodsmodelView = '';
        this.addmodal = {
          show: false
        };
      }
    }
  };
</script>
<style lang="less">
.tr-items {
  td {
    width: 25%;
    text-align: left;
    a {
      margin-right: 10px;
      text-decoration: none;
    }
  }
}
</style>
