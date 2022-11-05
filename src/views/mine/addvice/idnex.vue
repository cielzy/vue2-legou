<template>
  <div class="container">
    <!-- 头部返回栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 内容标题 -->
    <div class="content">
      <p class="title">意见与反馈</p>
    </div>
    <!-- 留言 -->
    <div class="addvice">
      <van-field v-model="message" rows="2" autosize label="留言" type="textarea" maxlength="150" placeholder="请填写你的意见与反馈" show-word-limit />
    </div>
    <!-- 联系方式 -->
    <div class="contact">
      <van-field v-model="value2" label="联系方式" placeholder="邮箱/手机号/微信号" />
    </div>
    <!-- 提交 -->
    <div class="submit">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import { submitAddvice } from '@/api/mine/index.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      message: '', // 留言内容
      value2: '' // 联系方式
    }
  },
  methods: {
    // 点击返回按钮
    onClickLeft() {
      this.$router.go(-1)
    },
    // 点击提交反馈
    submit() {
      // content name openId phone
      const openId = localStorage.getItem('openId')
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const name = userInfo.nickname
      if (this.message === '' || this.value2 === '') {
        Toast('请填写留言和联系方式')
      } else {
        submitAddvice({ content: this.message, name: name, openId: openId, phone: this.value2 }).then(res => {
          Toast('感谢您的反馈，祝您生活愉快！')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #eee;
  .content {
    margin-top: 2px;
    margin-bottom: 2px;
    .title {
      text-align: center;
      background-color: #fff;
      padding: 10px 0;
    }
  }
  .addvice {
    background-color: #fff;
    margin-bottom: 2px;
  }
  .contact {
    margin-bottom: 2px;
  }
  .submit {
    width: 100%;
    background-color: #fff;
    padding-top: 50px;

    text-align: center;
    button {
      width: 90%;
      height: 50px;
      font-size: 16px;
      background-color: #b4282d;
      color: #fff;
      border-radius: 8px;
    }
  }
}
</style>
