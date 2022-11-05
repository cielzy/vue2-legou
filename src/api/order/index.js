import request from '@/api/request.js'

// 提交订单  点击下单
function placeorder(data) {
  return request({
    url: '/order/submitAction',
    method: 'post',
    data: data
  })
}
// 订单页面信息获取
function getOrderInfo(data) {
  return request({
    url: '/order/detailAction',
    method: 'get',
    params: data
  })
}
export { placeorder, getOrderInfo }
