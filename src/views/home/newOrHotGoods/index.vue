<template>
  <div class="container">
    <!-- 头部导航栏以及图片-->
    <div class="header">
      <van-sticky>
        <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
      </van-sticky>
      <img src="@/assets//images/newgoodsheader.png" alt="" />
    </div>
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
      <div class="item" v-for="item in list" :key="item.id">
        <img :src="item.list_pic_url" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">{{ item.retail_price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewOrHot } from '@/api/home/index.js'
export default {
  data() {
    return {
      list: [],
      isHot: '',
      isNew: '',
      order: '',
      isActive: 1,
      arrow: ''
    }
  },
  methods: {
    // 点击返回按钮
    onClickLeft() {
      this.$router.push('/home')
    },
    // 获取信息
    getInfo() {
      const id = this.$route.params.id
      getNewOrHot({ isHot: id === 2 ? 1 : '', isNew: id === 1 ? 1 : '', order: this.order }).then(res => {
        this.list = res.data
      })
    },
    // 点击添加颜色
    changeItem(i) {
      this.isActive = i
      // 点击综合
      if (this.isActive === 1) {
        this.order = ''
        this.getInfo()
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
      this.getInfo()
      // 点击分类 没有变化
      if (this.isActive === 3) {
        this.getInfo()
      }
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #eee;
  .header {
    img {
      width: 100%;
    }
  }
  .category {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
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
}
</style>
