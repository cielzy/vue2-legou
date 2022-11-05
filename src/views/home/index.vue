<template>
  <div class="container">
    <!-- 定位 搜索框 -->
    <div class="header">
      <h3 id="address" @click="goMap">{{ location }}</h3>
      <van-search placeholder="请输入搜索关键词" class="input" @click="goSearch" />
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" :alt="item.name" class="swiperItem" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 简单的分页列表 -->
    <div class="icon">
      <div class="iconItem" v-for="item in channel" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.icon_url" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- 中间的间隙 -->
    <div class="empty"></div>
    <!-- 品牌制造商 -->
    <div class="title">
      <h3>品牌制造商直供</h3>
      <div class="producer">
        <div class="profucerItem" v-for="item in brandList" :key="item.id" @click="goProductors(item.id)">
          <img :src="item.new_pic_url" :alt="item.name" />
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.floor_price }}元起</p>
        </div>
      </div>
    </div>
    <div class="empty"></div>
    <!-- 新品首发title -->
    <div class="newGoods" @click="goNewOrHotGoods(1)">
      <h4>新品首发</h4>
      <p>查看全部</p>
    </div>
    <div class="empty"></div>
    <!-- 新品首发item -->
    <div class="newGoodsItem">
      <ul>
        <li v-for="item in newGoods" :key="item.id" @click="goGoods(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ item.goods_brief }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>
    <div class="empty"></div>
    <!-- 人气推荐title -->
    <div class="hotGoods" @click="goNewOrHotGoods(2)">
      <h4>人气推荐.好物推荐</h4>
      <p>查看全部</p>
    </div>
    <div class="empty"></div>
    <!-- 人气推荐item -->
    <div class="hotGoodsItem">
      <ul>
        <li v-for="item in hotGoods" :key="item.id" @click="goGoods(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ item.goods_brief }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </li>
      </ul>
    </div>
    <div class="empty"></div>
    <!-- 话题精选 -->
    <div class="topic">
      <p class="title1">专题精选<van-icon name="arrow" /></p>
      <ul>
        <li v-for="item in topicList" :key="item.id" @click="goTopic(item.id)">
          <img :src="item.item_pic_url" />
          <p class="price">{{ item.price_info }}元起</p>
          <p class="title">{{ item.title }}</p>
          <p class="subtitle">{{ item.subtitle }}</p>
        </li>
      </ul>
    </div>
    <!-- 好物推荐 -->
    <div class="category" v-for="item in newCategoryList" :key="item.id">
      <div class="title">{{ item.name }}好物</div>
      <div class="categortItem">
        <ul>
          <li v-for="subItem in item.goodsList" :key="subItem.id" @click="goGoods(subItem.id)">
            <img :src="subItem.list_pic_url" />
            <p class="name">{{ subItem.name }}</p>
            <p class="price">￥{{ subItem.retail_price }}</p>
          </li>
          <li @click="goCategory(item.id)">
            <div class="good">{{ item.name }}好物</div>
            <img src="../../assets/images/rightbig.png" alt="" class="img1" />
          </li>
        </ul>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import { index } from '@/api/home/index.js'
import { goodsInfo } from '@/api/cart/index.js'
export default {
  data() {
    return {
      banner: [],
      brandList: [],
      channel: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      location: '' // 定位
    }
  },
  methods: {
    // 点击跳转搜索页
    goSearch() {
      this.$router.push('/home/search')
    },
    // 点击跳转新品首发 或者人气推荐具体页面
    goNewOrHotGoods(num) {
      this.$router.push({ name: 'newOrHot', params: { id: num } })
    },
    // 点击跳转分页列表页
    goDetail(id) {
      this.$router.push({ name: 'categories', params: { id: id } })
    },
    // 点击制造商跳转至供应商详情
    goProductors(id) {
      this.$router.push({ name: 'productors', params: { id: id } })
    },
    // 点击商品跳转至详情
    goGoods(id) {
      this.$router.push({
        name: 'goodsdetail',
        params: { id: id }
      })
    },
    // 点击话题item跳转至话题详情
    goTopic(id) {
      this.$router.push({ name: 'topicdatail', params: { id: id } })
    },
    // 点击更多好物跳转至分页详情
    goCategory(id) {
      this.$router.push({ name: 'categories', params: { id: id } })
    },
    // 点击地址进入地图
    goMap() {
      this.$router.push('/map')
    }
  },
  created() {
    index().then(res => {
      this.banner = res.banner
      this.brandList = res.brandList
      this.channel = res.channel
      this.newGoods = res.newGoods
      this.hotGoods = res.hotGoods
      this.topicList = res.topicList
      this.newCategoryList = res.newCategoryList
    })
    const openId = localStorage.getItem('openId')
    goodsInfo({ openId }).then(res => {
      // 购物车length
      const length = res.data.length
      localStorage.setItem('length', length)
    })
  },
  mounted() {
    // 地图信息
    const _this = this
    const info = this.$store.state.cityInfo
    // 如果地图页面点击了地址就切换为点击的地址  没有则为系统默认定位的地址
    if (info.name) {
      _this.location = info.name
    } else {
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            _this.location = result.city
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  .header {
    display: flex;
    margin-left: 10px;
    align-items: center;
    #address {
      white-space: nowrap;
    }
    .input {
      width: 90%;
      margin-left: 20px;
    }
  }
  .swiper {
    .swiperItem {
      width: 100%;
      height: 200px;
    }
    ::v-deep .van-swipe__indicator {
      background-color: red;
    }
  }
  .icon {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 20px;
    .iconItem {
      img {
        width: 30px;
        height: 30px;
      }
      p {
        font-size: 12px;
      }
    }
  }
  .title {
    h3 {
      text-align: center;
      margin: 20px 0 20px 0;
    }
    .producer {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      .profucerItem {
        position: relative;
        width: 48%;
        img {
          width: 100%;
        }
        .name {
          position: absolute;
          top: 20px;
          left: 5px;
        }
        .price {
          position: absolute;
          top: 55px;
          left: 5px;
        }
      }
    }
  }
  .empty {
    height: 8px;
    width: 100%;
    background-color: #eee;
  }
  .newGoods {
    height: 122px;
    width: 100%;
    background: url('@/assets//images/bgnew.png') no-repeat;
    margin: 0 auto;
    background-size: 100% 100%;
    h4 {
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #8c9bae;
      padding: 30px 0;
    }
    p {
      text-align: center;
      line-height: 24px;
      height: 24px;
      width: 90px;
      align-items: center;
      background-color: #d8e4f0;
      color: #8c9bae;
      margin: 0 auto;
      margin-top: -20px;
    }
  }
  .footer {
    margin-top: 75.04px;
  }
  .newGoodsItem {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      white-space: nowrap;
      li {
        border-right: 1px solid #eee;
        padding: 20px 10px;
        width: 140px;

        img {
          width: 140px;
          height: 140px;
        }
        p {
          overflow: hidden; //溢出隐藏
          white-space: nowrap; //禁止换行
          text-overflow: ellipsis; //...
          margin-left: 20px;
        }
        .name {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .price {
          margin-top: 16px;
        }
        .desc {
          color: #8a8a8a;
          font-size: 12px;
        }
      }
    }
  }
  .hotGoods {
    height: 122px;
    width: 100%;
    background: url('@/assets//images//bgtopic.png') no-repeat;
    margin: 0 auto;
    background-size: 100% 100%;
    h4 {
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #b1a279;
      padding: 30px 0;
    }
    p {
      text-align: center;
      line-height: 24px;
      height: 24px;
      width: 90px;
      align-items: center;
      background-color: #f4e9cb;
      color: #8c9bae;
      margin: 0 auto;
      margin-top: -20px;
    }
  }
  .hotGoodsItem {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      white-space: nowrap;
      li {
        border-right: 1px solid #eee;
        padding: 20px 10px;
        width: 140px;

        img {
          width: 140px;
          height: 140px;
        }
        p {
          overflow: hidden; //溢出隐藏
          white-space: nowrap; //禁止换行
          text-overflow: ellipsis; //...
          margin-left: 20px;
        }
        .name {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .price {
          margin-top: 16px;
        }
        .desc {
          color: #8a8a8a;
          font-size: 12px;
        }
      }
    }
  }
  .topic {
    .title1 {
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      padding: 20px 0;
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      white-space: nowrap;
      li {
        display: inline-block;
        padding-left: 12px;
        width: 287px;
        img {
          width: 287px;
          height: 162px;
        }
        p {
          overflow: hidden; //溢出隐藏
          white-space: nowrap; //禁止换行
          text-overflow: ellipsis; //...
        }
        .price {
          float: right;
          color: #9c3232;
        }
        .title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .subtitle {
          font-size: 12px;
          color: #8a8a8a;
          padding-bottom: 30px;
        }
      }
    }
  }
  .category {
    .title {
      padding: 15px 0;
      background-color: #eee;
      text-align: center;
    }
    .categortItem {
      width: 100%;
      background-color: #eee;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li {
          width: 48%;
          border: 1px solid #eee;
          background-color: #fff;
          margin-bottom: 4px;
          img {
            width: 150px;
            height: 150px;
          }
          p {
            margin-left: 12px;
            margin-bottom: 16px;
          }
          .name {
            font-size: 12px;
          }
          .price {
            color: #9c3232;
          }
          .good {
            font-size: 16px;
            text-align: center;
            margin: 50px 0 30px 0;
          }
          .img1 {
            width: 35px;
            height: 35px;
            margin-left: 70px;
          }
        }
      }
    }
  }
}
</style>
