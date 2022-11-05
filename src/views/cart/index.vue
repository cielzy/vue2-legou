<template>
  <div class="container">
    <!-- 店铺好处 -->
    <div class="title">
      <p>✔30天无忧退货</p>
      <p>✔48小时快速退款</p>
      <p>✔满88元免邮费</p>
    </div>
    <!-- 产品列表 -->
    <div class="goods">
      <van-swipe-cell v-for="item in list" :key="item.id">
        <div class="content">
          <van-checkbox v-model="item.isChecked" icon-size="24px" checked-color="#b4282d"></van-checkbox>
          <img :src="item.list_pic_url" />
          <div class="desc">
            <p class="name">{{ item.goods_name }}</p>
            <p class="price">￥{{ item.retail_price }}</p>
          </div>
          <div class="count">X{{ item.number }}</div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deteleItem(item.id)" />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 下单 -->
    <div class="order">
      <div class="left"><van-checkbox icon-size="24px" checked-color="#b4282d" v-model="isAllChecked">全选</van-checkbox></div>
      <div class="right">
        <span class="total">￥{{ total }}</span>
        <div class="placeOrder" @click="order">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodsInfo, deteleGoods } from '@/api/cart/index.js'
import { placeorder } from '@/api/order/index.js'
import { Dialog, Toast } from 'vant'

export default {
  data() {
    return {
      list: [] // 购物车列表数据
    }
  },
  methods: {
    // 获取购物车列表数据
    getInfo() {
      const openId = localStorage.getItem('openId')
      goodsInfo({ openId }).then(res => {
        res.data.forEach(item => {
          item.isChecked = false
        })
        this.list = res.data
      })
    },
    // 滑动删除
    deteleItem(id) {
      Dialog.confirm({
        message: '确定删除吗？'
      })
        .then(() => {
          // on confirm
          deteleGoods({ id }).then(res => {
            this.getInfo()
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 点击下单提交订单
    order() {
      //  allPrise goodsId openId
      const openId = localStorage.getItem('openId')
      const arr = this.list.filter(item => item.isChecked)
      const goodsId = arr.map(item => {
        return item.goods_id
      })
      if (arr.length !== 0) {
        placeorder({ openId: openId, allPrise: this.total, goodsId: goodsId.join(',') }).then(res => {})
        this.$router.push({ name: 'order', params: { arr } })
        localStorage.setItem('arr', JSON.stringify(arr))
        localStorage.setItem('total', JSON.stringify(this.total))
      } else {
        Toast('请选择商品！')
      }
    }
  },
  computed: {
    // 全选按钮是否checked
    isAllChecked: {
      get() {
        return this.list.every(item => item.isChecked)
      },
      set(val) {
        return this.list.forEach(item => (item.isChecked = val))
      }
    },
    // 选中商品总价格的变化
    total() {
      return this.list.reduce((total, item) => {
        if (item.isChecked) {
          return (total += item.number * item.retail_price)
        } else {
          return total
        }
      }, 0)
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  padding-bottom: 100px;
  position: relative;
  .title {
    display: flex;
    justify-content: space-around;
    background-color: #eee;
    p {
      color: #666;
      font-size: 12px;
      padding: 10px 0;
    }
  }
  .goods {
    background-color: #fff;
    .content {
      width: 100vw;
      display: flex;
      align-items: center;
      position: relative;
      height: 96px;
      padding: 0 10px;
      border-bottom: 1px solid #eee;
      img {
        width: 62px;
        height: 62px;
        background-color: #eee;
        margin: 0 10px;
      }
      .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          margin: 0px 0 12px 0;
        }
        .price {
          color: #b4282d;
        }
      }
      .count {
        position: absolute;
        right: 50px;
      }
    }
    .delete-button {
      height: 100%;
    }
  }
  .order {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 50px;
    align-items: center;
    // z-index: 9999;
    .left {
      padding-left: 10px;
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      height: 50px;
      line-height: 50px;

      .total {
        color: #b4282d;
        margin-right: 20px;
      }
      .placeOrder {
        width: 100px;
        background-color: #b4282d;
        color: #fff;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        margin-right: 0;
      }
    }
  }
}
</style>
