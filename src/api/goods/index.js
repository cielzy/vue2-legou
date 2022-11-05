import request from '@/api/request.js'

// 商品详情信息页面
function goodsDetail(data) {
  return request({
    url: '/goods/detailaction',
    method: 'get',
    params: data
  })
}
// 添加收藏
function addCollect(data) {
  return request({
    url: '/collect/addcollect',
    method: 'post',
    data: data
  })
}
// 添加购物车
function addGoods(data) {
  return request({
    url: '/cart/addCart',
    method: 'post',
    data: data
  })
}
export { goodsDetail, addCollect, addGoods }
