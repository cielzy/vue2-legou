import request from '@/api/request.js'
// 获取首页信息
function index() {
  return request({
    url: '/index/index',
    method: 'get'
  })
}
// 获取首页供应商详情页面
function getProductors(data) {
  return request({
    url: '/brand/detailaction',
    method: 'get',
    params: data
  })
}
// 点击新品首发或者人气推荐数据
function getNewOrHot(data) {
  return request({
    url: '/goods/goodsList',
    params: data
  })
}
export { index, getProductors, getNewOrHot }
