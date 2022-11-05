<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="header">
      <img :src="info.list_pic_url" />
      <div class="name">
        <p>{{ info.name }}</p>
      </div>
      <p class="desc">{{ info.simple_desc }}</p>
    </div>
    <!-- 有数据 -->
    <div class="content" v-if="goodsList.length !== 0">
      <div class="item" v-for="item in goodsList" :key="item.id" @click="goGoodsDetal(item.id)">
        <img :src="item.list_pic_url" />
        <p class="name">{{ item.name }}</p>
        <p class="price">￥{{ item.retail_price }}</p>
      </div>
    </div>
    <!-- 无数据 -->
    <div class="none" v-else>数据库暂无内容...</div>
  </div>
</template>

<script>
import { getProductors } from '@/api/home/index.js'
export default {
  data() {
    return {
      info: {},
      goodsList: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 点击跳转商品详情
    goGoodsDetal(id) {
      this.$router.push({ name: 'goodsdetail', params: { id: id } })
    }
  },
  created() {
    const id = this.$route.params.id
    getProductors({ id: id }).then(res => {
      this.info = res.data
      this.goodsList = res.goodsList
    })
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #eee;
  height: 100vh;
  .header {
    position: relative;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 145px;
      z-index: 1;
    }
    .name {
      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -200%);
        z-index: 99;
        color: #fff;
        font-size: 19px;
        font-weight: 400;
        padding: 2px;
        border-bottom: 2px solid #fff;
      }
    }
    .desc {
      font-size: 15px;
      color: #666;
      padding: 21px 16px;
      background-color: #fff;
      text-align: center;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      text-align: center;
      width: 186px;
      height: 239px;
      margin: 0 0 2.5px;
      // padding: 7.5px 0;
      background-color: #fff;
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
  .none {
    color: #999;
    font-size: 16px;
    text-align: center;
    margin: 100px;
  }
}
</style>
