<template>
  <div class="container">
    <!-- 顶部导航栏固定 -->
    <van-sticky>
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id" class="swiperItem">
        <img :src="item.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 店铺好处 -->
    <div class="title">
      <p>✔30天无忧退货</p>
      <p>✔48小时快速退款</p>
      <p>✔满88元免邮费</p>
    </div>
    <!-- 商品基本信息与价格 -->
    <div class="info">
      <p class="name">{{ info.name }}</p>
      <p class="title">{{ info.goods_brief }}</p>
      <p class="price">￥{{ info.retail_price }}</p>
      <div class="eject">
        <van-cell is-link @click="showPopup" class="choose"> 请选择规格数量 </van-cell>
        <van-popup v-model="show" position="bottom" :style="{ height: '35%' }" class="content">
          <!-- 弹出层内容 -->
          <div class="top">
            <div class="left">
              <img :src="info.primary_pic_url" />
              <div class="leftTitle">
                <p class="price">价格￥{{ info.retail_price }}</p>
                <p class="num">请选择数量</p>
              </div>
            </div>
            <div class="right"><van-icon name="cross" @click="show = false" /></div>
          </div>
          <div class="count">
            <p>数量</p>
            <van-stepper v-model="value" integer />
          </div>
        </van-popup>
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="attr">
      <h2>商品参数</h2>
      <div class="item" v-for="item in attribute" :key="item.name">
        <p>{{ item.name }}</p>
        <span>{{ item.value }}</span>
      </div>
    </div>
    <!-- 商品的详情页描述 -->
    <div v-html="info.goods_desc" class="desc"></div>
    <!-- 常见问题 -->
    <div class="question">
      <p class="title">———— 常见问题 ————</p>
      <div class="item" v-for="item in issue" :key="item.id">
        <span class="spot"></span>
        <div>{{ item.question }}</div>
        <p>{{ item.answer }}</p>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="see">
      <p>————— 大家都在看 ————</p>
      <div class="body">
        <div class="item" v-for="item in productList" :key="item.id">
          <img :src="item.list_pic_url" />
          <p class="name">{{ item.name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
    <!-- 底部固定架构栏 -->
    <div class="footer">
      <div><van-icon name="star-o" size="23" color="red" class="star" @click="addCollecthanderler" /></div>
      <div><van-icon name="cart-o" size="31" :badge="length" class="cart" @click="goCart" /></div>
      <div @click="buyNow">立即购买</div>
      <div class="join" @click="addCart()">加入购物车</div>
    </div>
  </div>
</template>

<script>
import { goodsDetail, addCollect, addGoods } from '@/api/goods/index.js'
import { goodsInfo } from '@/api/cart/index.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      gallery: [], // 顶部导航栏
      info: {}, // 商品基本信息
      show: false, // 弹出框的显示
      value: 1, // 加入购物车count
      attribute: [], // 商品参数
      issue: [], // 常见问题
      productList: [], // 大家都在看
      length: '', // badge 购物车图标
      list: [] // 购物车数据
    }
  },
  methods: {
    // 获取商品信息
    getList() {
      const id1 = this.$route.params.id
      const id = this.$store.state.goodsId
      const openId = localStorage.getItem('openId')
      goodsDetail({ id: id1 || id, openId: openId }).then(res => {
        this.gallery = res.gallery
        this.info = res.info
        this.attribute = res.attribute
        this.issue = res.issue
        this.productList = res.productList
      })
    },
    // 导航取消回到上一个页面
    onClickLeft() {
      this.$router.go(-1)
    },
    // 弹出框的点击入口
    showPopup() {
      this.show = true
    },
    // 添加收藏
    addCollecthanderler() {
      const id1 = this.$route.params.id
      const openId = localStorage.getItem('openId')
      addCollect({ goodsId: id1, openId: openId }).then(res => {
        Toast.success('添加成功')
      })
    },
    // 加入购物车 点击第一次跳出弹出框  第二次加入成功
    addCart() {
      if (!this.show) {
        this.show = true
      } else {
        const id1 = this.$route.params.id
        const openId = localStorage.getItem('openId')
        const number = this.value
        addGoods({ goodsId: id1, openId: openId, number: number }).then(res => {
          Toast.success('添加购物车成功')
          const result = this.list.every(item => {
            return item !== id1
          })
          console.log(result)
          // 购物车商品不重重复 badge + 1
          if (result) {
            this.length++
          }
          this.getCartInfo()
        })
      }
    },
    // 购物数据
    cartList() {
      const openId = localStorage.getItem('openId')
      goodsInfo({ openId }).then(res => {
        // 购物车length
        this.list = res.data.map(item => {
          return item.goods_id
        })
      })
    },
    // 点击购物车图标
    goCart() {
      this.$router.push('/cart')
    },
    // 点击立即购买 点击第一次跳出弹出框  第二次跳转至下单
    buyNow() {
      if (!this.show) {
        this.show = true
      } else {
        this.$router.push('/order')
      }
    },
    // 获取购物车信息
    getCartInfo() {
      const openId = localStorage.getItem('openId')
      goodsInfo({ openId }).then(res => {
        // 购物车length
        this.length = res.data.length
        localStorage.setItem('length', length)
      })
    }
  },
  created() {
    this.getList()
    this.cartList()
    this.getCartInfo()
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #eee;
  padding-bottom: 50px;
  .my-swipe {
    .swiperItem {
      img {
        width: 100%;
      }
    }
  }
  .title {
    display: flex;
    justify-content: space-around;
    p {
      color: #666;
      font-size: 12px;
      padding: 10px 0;
    }
  }
  .info {
    background-color: #fff;
    text-align: center;
    margin-bottom: -8px;
    .name {
      font-size: 20px;
      font-weight: 500;
      padding: 10px;
    }
    .title {
      color: #999;
      font-size: 12px;
      margin: 12px 0;
    }
    .price {
      color: #b4282d;
      font-size: 17px;
      margin: 5px 0 0 0;
      padding-bottom: 30px;
      border-bottom: 1px solid #eee;
    }
    .eject {
      .choose {
        font-size: 12px;
        padding: 10px 10px 10px 10px;
      }
      .content {
        .top {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          .left {
            display: flex;
            img {
              width: 88px;
              height: 88px;
              margin-right: 15px;
            }
            .leftTitle {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

              .price {
                color: #b4282d;
                font-size: 12px;
                padding: 10px 0;
                border: none;
              }
              .num {
                font-size: 12px;
                margin: 5px 0;
              }
            }
          }
        }
        .count {
          text-align: left;
          margin-left: 15px;
        }
      }
    }
  }
  .attr {
    background-color: #fff;
    margin-top: 16px;
    padding-bottom: 20px;
    h2 {
      font-size: 19px;
      padding: 20px 20px 5px 20px;
      font-weight: 500;
    }
    .item {
      display: flex;
      background-color: #f7f7f7;
      padding: 10px 0;
      margin: 10px 20px 0 20px;
      p {
        color: #999;
        width: 67px;
      }
      span {
        width: 258px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .desc {
    ::v-deep img {
      width: 100%;
      height: 100%;
    }
    ::v-deep p {
      margin-bottom: -10px;
    }
  }
  .question {
    background-color: #fff;
    margin-top: 10px;
    padding-bottom: 20px;
    .title {
      text-align: center;
      padding: 17px 0 10px 0;
    }
    .item {
      width: 345px;
      margin-left: 10px;
      .spot {
        width: 4px;
        height: 4px;
        border: 1px solid #b4282d;
        border-radius: 50%;
        background-color: #b4282d;
        position: relative;
        top: 16px;
        margin-right: 5px;
      }
      div {
        font-size: 13px;
        padding: 0 0 7.5px 4px;
      }
      p {
        font-size: 13px;
        padding: 0 0 8px;
      }
    }
  }
  .see {
    background-color: #fff;
    margin-top: 40px;
    p {
      text-align: center;
      padding: 17px 0;
    }
    .body {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #eee;
      .item {
        width: 181px;
        padding: 0 0 5px;
        background-color: #fff;
        margin: 0 3px 3px 3px;
        img {
          width: 150px;
          height: 150px;
        }
        .name {
          text-align: left;
          margin-left: 12px;
          margin-top: -10px;
        }
        .price {
          color: #b4282d;
          text-align: left;
          margin-left: 12px;
          margin-top: -20px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    background-color: #fff;
    z-index: 9999;
    text-align: center;
    div {
      flex: 1;
      border-right: 1px solid #eee;
    }
    .join {
      background-color: #b4282d;
      color: #fff;
    }
    .cart {
      position: relative;
      top: 15%;
    }
    .star {
      position: relative;
      top: 5%;
    }
  }
}
</style>
