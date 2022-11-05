import request from '@/api/request.js'

// 购物车列表
function goodsInfo(data) {
  return request({
    url: '/cart/cartList',
    method: 'get',
    params: data
  })
}
// 删除购物车
function deteleGoods(data) {
  return request({
    url: '/cart/deleteAction',
    method: 'get',
    params: data
  })
}

export { goodsInfo, deteleGoods }
