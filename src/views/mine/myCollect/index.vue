<template>
  <div class="container">
    <!-- 头部返回栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 内容标题 -->
    <div class="content">
      <h1 class="title">我的收藏</h1>
    </div>
    <!-- 收藏的商品 -->
    <div class="images">
      <div class="imgItem" v-for="item in collectGoodsList" :key="item.id" @click="goGoodsDetail(item.id)">
        <img :src="item.list_pic_url" />
        <p class="name">{{ item.name }}</p>
        <p class="price">￥{{ item.retail_price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/mine/index.js'
export default {
  data() {
    return {
      collectGoodsList: []
    }
  },
  methods: {
    // 点击返回按钮
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取我的收藏列表
    getCollect() {
      getInfo({ openId: localStorage.getItem('openId') }).then(res => {
        this.collectGoodsList = res.collectGoodsList
      })
    },
    // 点击商品跳转商品详情
    goGoodsDetail(id) {
      this.$router.push({ name: 'goodsdetail', params: { id: id } })
    }
  },
  created() {
    this.getCollect()
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #eee;
  width: 100%;
  .content {
    margin-top: 2px;
    margin-bottom: 2px;
    .title {
      text-align: center;
      background-color: #fff;
      padding: 10px 0;
    }
  }
  .images {
    background-color: #eee;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .imgItem {
      background-color: #fff;
      width: 186px;
      height: 239px;
      text-align: center;
      margin-bottom: 2.5px;
      // padding: 7.5px 0;
      img {
        width: 150px;
        height: 150px;
      }
      .name {
        font-size: 12px;
        padding: 0 10px;
      }
      .price {
        color: #b4282d;
        font-size: 15px;
        margin: 15px 0;
      }
    }
  }
}
</style>
