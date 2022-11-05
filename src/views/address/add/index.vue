<template>
  <div>
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 信息 -->
    <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result :address-info="AddressInfo" :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" :area-placeholder="AddressInfo.address" />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { areaList } from '@vant/area-data'
import { addNewAddr, getAddress, deteleAddr } from '@/api/address/index.js'
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addAddressInfo: {},
      AddressInfo: {}
    }
  },
  methods: {
    // 点击返回按钮
    onClickLeft() {
      this.$router.go(-1)
    },
    // 点击保存按钮
    onSave(content) {
      const id = this.$route.params.id
      this.addAddressInfo = content
      // address addressId checked detailadress openId telNumber userName
      const province = this.addAddressInfo.province
      const city = this.addAddressInfo.city
      const county = this.addAddressInfo.county
      const address1 = [province, city, county]
      const data = {
        address: [...address1].join(' '),
        checked: this.addAddressInfo.isDefault,
        addressId: id || '',
        detailadress: this.addAddressInfo.addressDetail,
        openId: localStorage.getItem('openId'),
        telNumber: this.addAddressInfo.tel,
        userName: this.addAddressInfo.name
      }

      addNewAddr(data).then(res => {
        if (!id) {
          Toast('地址添加成功')
          this.AddressInfo = {}
          // this.getInfo()
        } else {
          Toast('地址修改成功')
          this.AddressInfo = {}
        }
      })
      this.getInfo()
    },
    // 点击删除
    onDelete() {
      const id = this.$route.params.id
      deteleAddr({ id }).then(res => {
        Toast('删除成功')
        this.AddressInfo = {}
      })
      this.getInfo()
    },
    // 根据跳转的id获取对应产品信息
    getInfo() {
      const id = this.$route.params.id
      if (id) {
        getAddress({ id: id }).then(res => {
          const address = res.data.address.split(' ').join('')
          this.AddressInfo = {
            id: res.data.id,
            name: res.data.name,
            tel: res.data.mobile,
            addressDetail: res.data.address_detail,
            isDefault: res.data.is_default === 1 ? true : false,
            province: address[0],
            city: address[1],
            county: address[2],
            address: address
          }
        })
      }
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
<style></style>
