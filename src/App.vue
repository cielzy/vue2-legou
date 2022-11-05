<template>
  <div class="tabbar">
    <van-tabbar route active-color="#c35559" v-if="isShow">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/topic" icon="description">专题</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="search">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  watch: {
    $route(to, from) {
      const arr = ['/home', '/topic', '/category', '/cart', '/mine']
      if (arr.includes(to.path)) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  created() {
    const userInfo = {
      openId: '18270296448',
      nickName: '羊哥哥',
      avatarUrl: require('@/assets/images/微信图片_20220624180950.jpg')
    }
    const openId = userInfo.openId
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('openId', openId)
  }
}
</script>

<style scoped></style>
