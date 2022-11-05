import request from '@/api/request.js'
// 分类左侧导航
function categoryList() {
  return request({
    url: '/category/indexaction',
    method: 'get'
  })
}
// 分类页右边菜单
function rightCategoryInfo(data) {
  return request({
    url: '/category/currentaction',
    method: 'get',
    params: data
  })
}
// 详情分页tab
function categortDetail(data) {
  return request({
    url: '/category/categoryNav',
    method: 'get',
    params: data
  })
}
// 点击详情
function categoryItem(data) {
  return request({
    url: '/goods/goodsList',
    method: 'get',
    params: data
  })
}

export { categoryList, rightCategoryInfo, categortDetail, categoryItem }
