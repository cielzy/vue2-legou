import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 首页路由
    name: 'home',
    component: Home
  },
  {
    path: '/home/search', // 搜索主页面
    name: 'search',
    component: () => import('../views/home/search/index.vue')
  },
  {
    path: '/home/newOrHot', // 新品首发页面
    name: 'newOrHot',
    component: () => import('../views/home/newOrHotGoods/index.vue')
  },
  {
    path: '/home/productors', // 新品首发页面
    name: 'productors',
    component: () => import('../views/home/productors/index.vue')
  },
  {
    path: '/cart', // 购物车页面
    name: 'cart',
    component: () => import('../views/cart/index.vue')
  },
  {
    path: '/category', // 分类首页
    name: 'category',
    component: () => import('../views/category/index.vue')
  },
  {
    path: '/category/categories', // 分页详情页
    name: 'categories',
    component: () => import('../views/category/categoryList/index.vue')
  },
  {
    path: '/mine', // 我的页面
    name: 'mine',
    component: () => import('../views/mine/index.vue')
  },
  {
    path: '/mine/addvice', // 意见反馈页面
    name: 'mine',
    component: () => import('../views/mine/addvice/idnex.vue')
  },
  {
    path: '/mine/collect', // 我的收藏页面
    name: 'collect',
    component: () => import('../views/mine/myCollect/index.vue')
  },
  {
    path: '/topic', // 话题页面
    name: 'topic',
    component: () => import('../views/topic/index.vue')
  },
  {
    path: '/topic/topicdatail', // 话题详细页面
    name: 'topicdatail',
    component: () => import('../views/topic/topicDetail/index.vue')
  },
  {
    path: '/goods/detail', // 商品详情页
    name: 'goodsdetail',
    component: () => import('../views/goods/index.vue')
  },
  {
    path: '/order', // 订单页面
    name: 'order',
    component: () => import('../views/order/index.vue')
  },
  {
    path: '/address/add', // 添加地址页面
    name: 'addAddress',
    component: () => import('../views/address/add/index.vue')
  },
  {
    path: '/address', // 地址页面
    name: 'address',
    component: () => import('../views/address/index.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
