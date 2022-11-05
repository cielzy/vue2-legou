<template>
  <div class="container">
    <!-- 头部导航栏 -->
    <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    <form action="/">
      <van-search v-model="value" show-action :placeholder="defaultKeyword.keyword" @search="onSearch" @cancel="onCancel" @input="getPromptInfo" />
    </form>
    <div v-if="show === 1">
      <!-- 历史记录 -->
      <div class="history1" v-if="historyData.length !== 0">
        <div class="header">
          <p>历史记录</p>
          <img src="@/assets/images/del-address.png" alt="" @click="deteleSearch" />
        </div>
        <div class="historyItem">
          <div class="historyItem1" v-for="item in historyData" :key="item.id" @click="onSearch(item.keyword)">{{ item.keyword }}</div>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="hotSearch">
        <p>热门搜索</p>
        <div class="hotSearchItem">
          <div class="hotSearchItem1" v-for="item in hotKeywordList" :key="item.keyword" :class="item.is_hot === 1 ? 'active' : ''" @click="onSearch(item.keyword)">{{ item.keyword }}</div>
        </div>
      </div>
    </div>
    <!-- 输入框开始输入 -->
    <div class="input" v-else-if="show === 2">
      <p v-if="keywords.length === 0" class="noGoods">数据库暂无此类产品...</p>
      <p class="item" v-for="item in keywords" :key="item.id" @click="goGoods(item.name)" v-else>{{ item.name }}</p>
    </div>

    <!-- 点击产品跳转至产品详情 -->
    <div class="goods" v-else>
      <!-- 三级分类 -->
      <div class="category">
        <div :class="{ active: isActive === 1 }" @click="changeItem(1)">综合</div>
        <div class="price" :class="{ active: isActive === 2 }" @click="changeItem(2)">
          价格
          <div class="icons">
            <van-icon name="arrow-up" :color="this.isActive === 2 && arrow === 'up' ? '#b4282d' : ''" />
            <van-icon name="arrow-down" :color="this.isActive === 2 && arrow === 'down' ? '#b4282d' : ''" />
          </div>
        </div>
        <div :class="{ active: isActive === 3 }" @click="changeItem(3)">分类</div>
      </div>
      <!-- 产品item -->
      <div class="content">
        <div class="item" v-for="item in keywords" :key="item.id" @click="goDetail(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo, deleteHistory, addHistory, promptSearch } from '@/api/home/search/index.js'
export default {
  data() {
    return {
      value: '', // 输入框的关键词
      hotKeywordList: [], // 热门搜索关键词
      historyData: [], // 历史搜索记录
      defaultKeyword: {}, // 默认的搜索框提示
      openId: '', // 登录id
      show: 1, // 搜索的页面是都展开
      order: '', // 排序参数  asc desc
      keywords: [], // 搜索的联系词
      isActive: '', // 三级分类高亮颜色
      newValue: ''
    }
  },
  methods: {
    // 点击搜索 添加关键词
    onSearch(keyword) {
      // keyword openId
      addHistory({ openId: this.openId, keyword: this.value || keyword }).then(res => {
        this.getSearchInfo()
        this.value = ''
      })
      if (this.value === '') {
        this.show = 1
      }
    },
    // 获取数据
    getSearchInfo() {
      this.openId = localStorage.getItem('openId')
      getInfo({ openId: this.openId }).then(res => {
        this.hotKeywordList = res.hotKeywordList
        this.historyData = res.historyData
        this.defaultKeyword = res.defaultKeyword
      })
    },
    //  点击取消
    onCancel() {
      this.$router.push('/home')
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1)
    },
    // 点击删除历史记录
    deteleSearch() {
      deleteHistory({ openId: this.openId }).then(res => {
        this.getSearchInfo()
      })
    },
    // 搜索框发生变化
    getPromptInfo() {
      this.show = 2
      this.getPrompt()
      if (this.value === '') {
        this.show = 1
      }
    },
    // 获取搜索提示
    getPrompt() {
      //  keyword order
      promptSearch({ keyword: this.value, order: this.order }).then(res => {
        this.keywords = res.keywords
      })
    },
    // 关键词更新后的搜索
    getNewInfo() {
      promptSearch({ keyword: this.newValue, order: this.order }).then(res => {
        this.keywords = res.keywords
      })
    },
    // 点击搜索产品跳转至对应产品
    goGoods(keyword) {
      this.show = 3
      this.isActive = 1
      this.newValue = keyword
      this.getNewInfo()
    },
    // 点击添加颜色
    changeItem(i) {
      this.isActive = i
      // 点击综合
      if (this.isActive === 1) {
        this.order = ''
        this.getNewInfo()
      }
      // 点击价格
      if (this.isActive === 2 && this.arrow === '') {
        this.arrow = 'up'
        this.order = 'asc'
      } else if (this.isActive === 2 && this.arrow === 'up') {
        this.arrow = 'down'
        this.order = 'desc'
      } else {
        this.arrow = 'up'
        this.order = 'asc'
      }
      this.getNewInfo()
      // 点击分类 没有变化
      if (this.isActive === 3) {
        this.getNewInfo()
      }
    },
    // 点击产品跳转至对应详情页
    goDetail(id) {
      this.$router.push({ name: 'goodsdetail', params: { id: id } })
    }
  },
  created() {
    this.show = 1
    this.getSearchInfo()
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #eee;
  // height: 100vh;
  .history1 {
    background-color: #fff;
    padding: 16px;
    margin-bottom: 10px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .historyItem {
      display: inline-block;
      .historyItem1 {
        display: inline-block;
        border: 1px solid;
        padding: 5px;
        margin: 5px 5px 5px 0;
      }
    }
  }

  .hotSearch {
    background-color: #fff;
    padding: 16px;
    margin-bottom: 10px;
    p {
      margin: 16px 0;
    }
    .hotSearchItem {
      display: inline-block;
      .hotSearchItem1 {
        display: inline-block;
        border: 1px solid;
        padding: 5px;
        margin: 5px 10px 5px 0;
      }
      .active {
        color: #b4282d;
      }
    }
  }
}
.input {
  background-color: #fff;
  .noGoods {
    text-align: center;
    padding: 150px 0;
  }
  .item {
    padding: 10px 0;
    margin-left: 15px;
  }
}
.goods {
  background-color: #eee;
  .category {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    margin-bottom: 3px;
    padding: 4px 0;
    .active {
      color: #b4282d;
    }
    .icons {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-left: 10px;
      color: gray;
    }
    .price {
      display: flex;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    .item {
      text-align: center;
      width: 186px;
      height: 239px;
      margin: 0 2.5px 0 0;
      // padding: 7.5px 0;
      background-color: #fff;
      border-right: 2px solid #eee;
      img {
        background-color: #fff;
        width: 151px;
        height: 151px;
      }
      .name {
        margin: 7.5px 0 11px;
      }
      .price {
        color: #b4282d;
        font-size: 15px;
      }
    }
  }
}
</style>
