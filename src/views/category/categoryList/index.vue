<template>
  <div class="container">
    <!-- 头部返回栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 导航栏 -->
    <van-tabs class="content" @click="goDetail" @rendered="changeColor" v-model="active" :lazy-render="false">
      <van-tab v-for="item in navData" :key="item.id" :title="item.name" class="tabs" :name="item.id">
        <!-- 标题 -->
        <div class="titleItem">
          <p class="name">{{ currentNav.name }}</p>
          <p class="desc">{{ currentNav.front_desc }}</p>
        </div>
        <!-- 无数据 -->
        <div class="noContainer" v-if="list.length === 0">
          <p>数据库暂无数据...</p>
        </div>
        <!-- 有数据 -->
        <div class="images" v-else>
          <div class="imgItem" v-for="item in list" :key="item.id" @click="goGoodsDetail(item.id)">
            <img :src="item.list_pic_url" />
            <p class="name">{{ item.name }}</p>
            <p class="price">￥{{ item.retail_price }}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categortDetail, categoryItem } from '@/api/category/index.js'
export default {
  data() {
    return {
      navData: [],
      currentNav: {},
      clickNav: {},
      list: [],
      active: ''
    }
  },
  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取头部导航栏数据
    getList() {
      const id1 = this.$route.params.id
      categortDetail({ id: id1 }).then(res => {
        this.navData = res.navData
        this.currentNav = res.currentNav
      })
    },
    // 点击导航栏跳转对应展示的信息
    goDetail(name) {
      categoryItem({ categoryId: name }).then(res => {
        this.active = name
        this.currentNav = res.currentNav
        this.list = res.data
      })
    },
    // tab栏根据id切换
    changeColor(name) {
      const id1 = this.$route.params.id
      if (id1 !== name) {
        this.active = id1
      }
    },
    // 点击跳转详情
    goGoodsDetail(id) {
      this.$router.push({ name: 'goodsdetail', params: { id: id } })
    }
  },
  created() {
    this.getList()
    const id = this.$store.state.castegoryId
    const id1 = this.$route.params.id
    categoryItem({ categoryId: id1 || id }).then(res => {
      this.currentNav = res.currentNav
      this.list = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #eee;
  .content {
    background-color: #eee;
    .tabs {
      .titleItem {
        margin-top: 10px;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 10px;
        background-color: #fff;
        margin-bottom: 2.5px;
        align-items: center;
        .name {
          font-size: 15px;
        }
        .desc {
          font-size: 12px;
          color: #999;
          padding: 10px 0 20px 0;
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
      .noContainer {
        height: 417px;
        p {
          color: #999;
          text-align: center;
          font-size: 12px;
          margin: 50px 0 150px 0;
        }
      }
    }
  }
}
</style>
