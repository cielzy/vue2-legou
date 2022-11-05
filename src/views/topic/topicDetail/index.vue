<template>
  <div class="container">
    <van-sticky> <van-nav-bar title="分类详情" left-text="返回" left-arrow @click-left="onClickLeft" /> </van-sticky>
    <div v-html="list.content" class="content"></div>
    <h2>专题推荐</h2>
    <div class="recommend" v-for="item in recommendList" :key="item.id">
      <div class="recommendItem">
        <img :src="item.scene_pic_url" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toppicDetailList } from '@/api/topic/index.js'
export default {
  data() {
    return {
      list: [],
      recommendList: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getTopicDatail() {
      const id1 = this.$route.params.id
      const id = this.$store.state.id
      toppicDetailList({ id: id || id1 }).then(res => {
        this.list = res.data
        this.recommendList = res.recommendList
      })
    }
  },
  created() {
    this.getTopicDatail()
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #eee;
  padding-bottom: 5px;
  position: relative;

  .content {
    ::v-deep img {
      width: 100%;
    }
  }
  h2 {
    text-align: center;
    padding: 20px 0;
    color: #999;
    font-size: 15px;
    font-weight: 400;
  }
  .recommend {
    width: 100%;
    margin-top: -10px;
    .recommendItem {
      margin: 12px 12px 20px;
      background-color: #fff;
      box-sizing: border-box;
      width: 345px;
      height: 214px;
      img {
        width: 321px;
        height: 139px;
        padding: 10px 10px;
        text-align: center;
      }
      p {
        margin: 15px 0 14px 12px;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
</style>
