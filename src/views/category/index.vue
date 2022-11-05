<template>
  <div class="container">
    <!-- 搜索 -->
    <van-search placeholder="商品搜索,共239款好物" @click="goSearch" />
    <!-- 左导航栏 -->
    <div class="nav">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item :title="item.name" v-for="item in categoryList" :key="item.id" @click="goDetail(item.id)" class="navItem" />
      </van-sidebar>
    </div>
    <!-- 右边图片展示区域 -->
    <div class="navRight">
      <img :src="categoryInfo.banner_url" alt="" />
      <p>一{{ categoryInfo.name }}分类一</p>
      <div class="item">
        <van-grid :column-num="3" :border="false" center>
          <van-grid-item v-for="item in subList" :key="item.id" @click="gocategoryDetail(item.id)">
            <van-image :src="item.wap_banner_url" />
            <p class="title">{{ item.name }}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryList, rightCategoryInfo } from '@/api/category'
export default {
  data() {
    return {
      activeKey: 0,
      categoryList: [],
      subList: [],
      categoryInfo: {}
    }
  },
  methods: {
    // 获取分类页数据
    getCategoryList() {
      categoryList().then(res => {
        this.categoryList = res.categoryList
      })
    },
    // 点击获取右侧图片信息
    goDetail(id) {
      rightCategoryInfo({ id }).then(res => {
        this.categoryInfo = res.data.currentOne
        this.subList = res.data.currentOne.subList
      })
    },
    // 点击转至搜索页面
    goSearch() {
      this.$router.push('/home/search')
    },
    // 点击跳转详情页面
    gocategoryDetail(id) {
      this.$router.push({ name: 'categories', params: { id: id } })
    }
  },
  created() {
    this.getCategoryList()
    rightCategoryInfo({ id: 1005000 }).then(res => {
      this.categoryInfo = res.data.currentOne
      this.subList = res.data.currentOne.subList
    })
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  position: relative;
  .navRight {
    width: 78%;
    position: absolute;
    padding-bottom: 50px;
    left: 82px;
    top: 60px;
    img {
      width: 263px;
      margin: 15px;
    }
    p {
      text-align: center;
    }
    .item {
      .title {
        margin: 10px;
        white-space: nowrap;
      }
    }
  }
  .nav {
    .navItem {
      background-color: #fff;
    }
  }
}
</style>
