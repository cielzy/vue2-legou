<template>
  <div class="container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <div class="topicList" v-for="item in topicInfo" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.scene_pic_url" />
        <p class="title">{{ item.title }}</p>
        <p class="subtitle">{{ item.subtitle }}</p>
        <p class="price">{{ item.price_info }}元起</p>
      </div>
    </van-list>
  </div>
</template>

<script>
import { topicList } from '@/api/topic/index.js'
export default {
  data() {
    return {
      topicInfo: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.page++
      this.init()
    },
    init() {
      topicList({ page: this.page }).then(res => {
        this.id = res.data.id
        this.topicInfo.push(...res.data)
        this.loading = false
        // 数据全部加载完成
        if (this.page === res.total) {
          this.finished = true
        }
      })
    },
    goDetail(id) {
      this.$router.push('/topic/topicdatail')
      this.$store.commit('savaID', id)
    }
  },

  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  background-color: #eee;
  .topicList {
    margin-bottom: 10px;
    background-color: #fff;
    img {
      width: 100%;
    }
    p {
      text-align: center;
    }
    .title {
      font-size: 17px;
      font-weight: 400;
      margin: 17px 0;
    }
    .subtitle {
      font-size: 12px;
      color: #999;
    }
    .price {
      color: #b4282d;
      font-size: 13px;
      margin: 17px 0 0 0;
      padding-bottom: 20px;
    }
  }
}
</style>
