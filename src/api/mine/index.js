import request from '@/api/request.js'

// 获取收藏的商品信息
function getInfo(data) {
  return request({
    url: '/collect/listAction',
    method: 'get',
    params: data
  })
}
// 提交反馈
function submitAddvice(data) {
  return request({
    url: '/feedback/submitAction',
    method: 'post',
    data: data
  })
}
export { getInfo, submitAddvice }
