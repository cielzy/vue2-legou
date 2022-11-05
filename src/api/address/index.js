import request from '@/api/request.js'

// 获取地址栏信息
function addressInfo(data) {
  return request({
    url: '/address/getListAction',
    method: 'get',
    params: data
  })
}
// 新建地址
function addNewAddr(data) {
  return request({
    url: '/address/saveAction',
    method: 'post',
    data: data
  })
}
// 获取收货地址详情
function getAddress(data) {
  return request({
    url: '/address/detailAction',
    method: 'get',
    params: data
  })
}
// 删除地址
function deteleAddr(data) {
  return request({
    url: '/address/deleteAction',
    method: 'get',
    params: data
  })
}
export { addressInfo, addNewAddr, getAddress, deteleAddr }
