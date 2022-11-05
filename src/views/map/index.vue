<template>
  <div class="box">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar title="乐购" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 搜索款 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" class="text" />
    <!-- 搜索结果 -->
    <ul class="result" v-if="this.value !== ''">
      <li v-for="item in searchList" :key="item.id" class="resultItem" @click="goHome(item)">{{ item.name }}</li>
    </ul>
    <!-- title -->
    <h2>显示当前位置：</h2>
    <!-- 地图 -->
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '', // 搜索框keyword
      city: '', // 默认地址
      searchList: [] // 根据keyword的相关搜索列表
    }
  },
  watch: {
    value() {
      // 判断之前是否点击了搜索里的定位  如果有  显示的就是之前点击的地点信息  没有就显示默认消息
      const _this = this
      const info = this.$store.state.cityInfo
      if (info.name) {
        AMap.plugin('AMap.AutoComplete', function () {
          var autoOptions = {
            //city 限定城市，默认全国  之前点击过的城市
            city: info.name
          }
          // 实例化AutoComplete
          var autoComplete = new AMap.AutoComplete(autoOptions)
          // 根据关键字进行搜索   _this.value 搜索关键词
          autoComplete.search(_this.value, function (status, result) {
            // 搜索成功时，result即是对应的匹配数据
            _this.searchList = result.tips
          })
        })
      } else {
        // JSAPI 2.0 输入提示插件名称由 AMap.Autocomplete 变更为 AMap.AutoComplete 啦！
        AMap.plugin('AMap.AutoComplete', function () {
          var autoOptions = {
            //city 限定城市，默认全国   默认地址的城市
            city: _this.city
          }
          // 实例化AutoComplete
          var autoComplete = new AMap.AutoComplete(autoOptions)
          // 根据关键字进行搜索  _this.value 搜索关键词
          autoComplete.search(_this.value, function (status, result) {
            // 搜索成功时，result即是对应的匹配数据
            _this.searchList = result.tips
          })
        })
      }
    }
  },
  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.push({ name: 'home' })
    },
    // 点击地址返回首页并将首页的地址更改
    goHome(item) {
      this.$router.push({ name: 'home' })
      this.$store.commit('saveCityInfo', item)
    }
  },
  mounted() {
    const info = this.$store.state.cityInfo
    const _this = this
    // 判断之前是否点击了搜索里的定位  如果有  显示的就是之前点击的地点信息  没有就显示默认消息
    if (info.name) {
      var map = new AMap.Map('container', {
        zoom: 16,
        center: [info.location.lng, info.location.lat] //中心点坐标
      })
      var marker = new AMap.Marker({
        position: [info.location.lng, info.location.lat] //位置
      })
      map.add(marker) //添加到地图
    } else {
      // 默认地址信息
      var map = new AMap.Map('container', {})
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            _this.city = result.city
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  h2 {
    position: fixed;
    bottom: 200px;
    padding: 0 0 15px 15px;
  }
  #container {
    width: 100%;
    height: 200px;
    position: fixed;
    bottom: 0;
  }
  .text {
    width: 100%;
    height: 50px;
    margin: 0 auto;
  }
  .result {
    overflow: auto;
    height: 320px;
    .resultItem {
      padding: 10px 15px;
    }
  }
}
</style>
