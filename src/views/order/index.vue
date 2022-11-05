<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 地址栏 -->
    <div class="address" @click="goAddress">
      <div class="left">
        <div class="top">
          <p class="name">{{ address.name }}</p>
          <p class="default" v-if="address.is_default">默认</p>
        </div>
        <div class="footer1">
          <p class="phone">{{ address.mobile }}</p>
          <p class="address1">{{ address.address + address.address_detail }}</p>
        </div>
      </div>
      <div class="right"><van-icon name="arrow" size="20" /></div>
    </div>
    <!-- 商品基本信息 -->
    <div class="goodsInfo">
      <div class="item">
        <p class="total">商品合计</p>
        <p class="price">￥{{ total }}</p>
      </div>
      <div class="item">
        <p class="total">运费</p>
        <p class="price">免运费</p>
      </div>
      <div class="item">
        <p class="total">优惠券</p>
        <p class="price">暂无</p>
      </div>
    </div>
    <!-- 下单的商品 -->
    <div class="item1">
      <div class="goods" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="item.list_pic_url" />
          <div class="info">
            <p class="name">{{ item.goods_name }}</p>
            <p class="price">￥{{ item.retail_price }}</p>
          </div>
        </div>
        <div class="count">X{{ item.number }}</div>
      </div>
    </div>
    <!-- 底部信息栏 -->
    <div class="footer">
      <div class="money">实付：￥{{ total }}</div>
      <div class="pay" @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getOrderInfo } from '@/api/order/index.js'
export default {
  data() {
    return {
      address: {},
      total: '',
      list: ''
    }
  },
  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.push('/cart')
    },
    // 点击进入地址详情页
    goAddress() {
      this.$router.push('/address')
    },
    // 初始化页面的信息
    getInfo() {
      const id = this.$route.params.id
      getOrderInfo({ openId: localStorage.getItem('openId'), addressId: id || 11445 }).then(res => {
        this.address = res.address
      })
    },
    // 点击支付
    pay() {
      Toast('支付功能暂未开发')
    }
  },
  created() {
    this.getInfo()
    this.list = JSON.parse(localStorage.getItem('arr'))
    console.log(localStorage.getItem('total'))
    this.total = localStorage.getItem('total')
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: auto;
  background-color: #eee;
  height: 90vh;
  padding-bottom: 50px;
  .address {
    background: url('@/assets//images/address-bg-bd.png') 0 0 repeat-x #fff;
    margin: 0 0 10px;
    padding: 25px 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .top {
        display: flex;
        flex-direction: column;
        margin: 10px 20px 10px 5px;
        .name {
          margin-bottom: 10px;
        }
        .default {
          border: 1px solid #b4282d;
          color: #b4282d;

          padding: 0 2px;
          text-align: center;
        }
      }
      .footer1 {
        display: flex;
        flex-direction: column;
        width: 240px;
        .phone {
          margin-bottom: 10px;
        }
        .address1 {
          width: 260px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .goodsInfo {
    background-color: #fff;
    margin-top: 10px;
    padding: 15px 15px 10px 20px;
    .item {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #eee;
      padding: 10px 0;
    }
  }
  .item1 {
    margin-top: 10px;
    background-color: #fff;
    .goods {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 10px;
      border-bottom: 1px solid #eee;
      .left {
        width: 100%;
        display: flex;
        img {
          width: 62px;
          height: 62px;
          background-color: #eee;
          margin-right: 12px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            padding: 0px 0 10px 0;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    .money {
      padding-left: 12px;
    }
    .pay {
      background-color: #b4282d;
      color: #fff;
      width: 100px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
  }
}
</style>
