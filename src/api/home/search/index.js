import request from '@/api/request.js'
// 获取首页信息
function getInfo(data) {
  return request({
    url: '/search/indexaction',
    method: 'get',
    params: data
  })
}
// 删除历史记录
function deleteHistory(data) {
  return request({
    url: '/search/clearhistoryAction',
    method: 'post',
    data: data
  })
}
// 添加搜索关键词
function addHistory(data) {
  return request({
    url: '/search/addhistoryaction',
    method: 'post',
    data: data
  })
}
// 搜索提示
function promptSearch(data) {
  return request({
    url: '/search/helperaction',
    method: 'get',
    params: data
  })
}
export { getInfo, deleteHistory, addHistory, promptSearch }
