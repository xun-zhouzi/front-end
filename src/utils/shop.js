import request from '@/utils/request'

// 查询店铺列表
export function listOrderlistshop(query) {
  return request({
    url: '/system/orderlistshop/list',
    method: 'get',
    params: query
  })
}

// 查询店铺详细
export function getOrderlistshop(id) {
  return request({
    url: '/system/orderlistshop/' + id,
    method: 'get'
  })
}

// 新增店铺
export function addOrderlistshop(data) {
  return request({
    url: '/system/orderlistshop',
    method: 'post',
    data: data
  })
}

// 修改店铺
export function updateOrderlistshop(data) {
  return request({
    url: '/system/orderlistshop',
    method: 'put',
    data: data
  })
}

// 删除店铺
export function delOrderlistshop(id) {
  return request({
    url: '/system/orderlistshop/' + id,
    method: 'delete'
  })
}
