import request from '@/api/request.js'

function topicList(data) {
  return request({
    url: '/topic/listaction',
    method: 'get',
    params: data
  })
}

function toppicDetailList(data) {
  return request({
    url: '/topic/detailaction',
    method: 'get',
    params: data
  })
}

export { topicList, toppicDetailList }
