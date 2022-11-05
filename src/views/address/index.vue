<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 地址栏 -->
    <div class="item">
      <div class="address" v-for="item in list" :key="item.id" @click="changeAddr(item.id)">
        <div class="left">
          <div class="top">
            <p class="name">{{ item.name }}</p>
            <p class="default" v-if="item.is_default">默认</p>
          </div>
          <div class="footer1">
            <p class="phone">{{ item.mobile }}</p>
            <p class="address1">{{ item.address + item.address_detail }}</p>
          </div>
        </div>
        <div class="right"><van-icon name="edit" size="20" @click="onEdit(item.id)" /></div>
      </div>
    </div>
    <!-- 底部新建地址 -->
    <div class="footer"><div class="add" @click="onAdd">+新建地址</div></div>
  </div>
</template>

<script>
import { addressInfo } from '@/api/address/index.js'
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.go(-1)
    }, // 获取地址信息
    getAddressInfo() {
      addressInfo({ openId: localStorage.getItem('openId') }).then(res => {
        this.list = res.data
      })
    },
    // 点击新增地址
    onAdd() {
      this.$router.push('/address/add')
    },
    // 点击编辑图标
    onEdit(id) {
      this.$router.push({ name: 'addAddress', params: { id: id } })
    },
    // 点击更换地址
    changeAddr(id) {
      this.$router.push({ name: 'order', params: { id: id } })
    }
  },
  created() {
    this.getAddressInfo()
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  height: 100vh;
  padding-bottom: 50px;
  .item {
    .address {
      margin: 0 0 10px;
      padding: 25px 15px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #eee;
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
  }
  .footer {
    .add {
      width: 90%;
      height: 37px;
      line-height: 37px;
      margin: 0 auto;
      border: 1px solid #b4282d;
    }
    position: fixed;
    bottom: 0;
    text-align: center;
    color: #b4282d;
    width: 100%;
    z-index: 8888;
    padding: 15px 0;
    background-color: #fff;
  }
}
</style>
