<template>
    <div class="c-poetry">
      <div class="ui grid" v-show="poetry.author">
        <div class="four wide column">
          <a v-if="poetry.author" v-link="{path: '/users/+poetry.author.id'}"><img class="avatar" :src="poetry.author.avatar"></a>
        </div>
        <div class="eight wide column">
          <div class="ui segment">
            <a v-link="{path: '/poetries' + poetry.id}"><img class="photo" v-if="poetry.cover" :src="poetry.cover" /></a>
            <h3 class="title"><a v-link="{path:'/poetries/' + poetry.id}"> 《{{poetry.name}}》</a></h3>
            <pre>{{poetry.description}}</pre>
          </div>
          <span class="tag">{{poetry.id | idToFromNow}}</span>
          <span class="tag right">
            <a v-link="{path:'/poetries/'+poetry.id}">浏览{{poetry.pv}}</a>&nbsp;&nbsp;
            <a v-link="{path:'/poetries/'+poetry.id}">留言{{poetry.comments_count}}</a>
            <div class="dropdown ui inline">
               <div class="text"></div>
               <i class="dropdown icon"></i>
               <div class="menu">
                 <div class="item" data-text="" @click="recommend('poetry', poetry._id)">推荐置顶</div>
                  <div class="item" data-text="" @click="report('poetry', poetry._id)">举报</div>
                  <div class="divider" v-if="!!isAuthor"></div>
                  <div class="item" data-text="" v-if="isAuthor" v-link="{path: '/poetries/' + poetry._id + '/edit'}">编辑</div>
                  <div class="item" data-text="" v-if="isAuthor" @click="deletePoetry">删除</div>
               </div>
            </div>
          </span>
        </div>
      </div>
    </div>
</template>
<script>
import User from '../mixins/User'
// import LoadMore from '../mixins/LoadMore'
export default {
  props: ['poetry'],
  mixin: [User],
  components: {
    User
  },
  ready () {
//    $('.ui.dropdown').dropdown()
//    $('.ui.dropdow .item').removeClass('active')
  },
  component: {
//    jQuery,
    isAuthor: function () {
      return this.uid === (this.poetry.author && this.poetry.author._id)
    }
  }
}
</script>
