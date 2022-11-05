<template>
  <div class="container">
    <div class="header">
      <img :src="userInfo.avatarUrl" />
      <p class="name">{{ userInfo.nickName }}</p>
    </div>
    <div class="content">
      <van-grid :column-num="3">
        <van-grid-item text="我的订单" class="grid" />
        <van-grid-item text="优惠券" class="grid" />
        <van-grid-item text="我的足迹" class="grid" />
        <van-grid-item text="我的收藏" class="grid" to="/mine/collect" />
        <van-grid-item text="地址管理" class="grid" to="/address" />
        <van-grid-item text="联系客服" class="grid" />
        <van-grid-item text="帮助中心" class="grid" />
        <van-grid-item text="意见反馈" class="grid" to="/mine/addvice" />
        <van-grid-item text="" class="grid" />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.userInfo = userInfo
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  height: 100vh;
  .header {
    height: 140px;
    background-color: #333;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    img {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .name {
      font-size: 14px;
    }
  }
  .content {
    .grid {
      height: 70px;
      border-top: 1px solid #f4f4f4;
      border-right: 1px solid #f4f4f4;
    }
  }
}
</style>
