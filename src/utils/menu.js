import request from '@/utils/request'

// 查询分页菜单
export function listOrderlistmenu(query) {
  return request({
    url: '/system/orderlistmenu/list',
    method: 'get',
    params: query
  })
}

// 查看全部菜单
export function listOrderAllInfomenu(query) {
  return request({
    url: '/system/orderlistmenu/allInfo',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getOrderlistmenu(id) {
  return request({
    url: '/system/orderlistmenu/' + id,
    method: 'get'
  })
}


// 新增菜单
export function addOrderlistmenu(data) {
  return request({
    url: '/system/orderlistmenu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateOrderlistmenu(data) {
  return request({
    url: '/system/orderlistmenu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delOrderlistmenu(id) {
  return request({
    url: '/system/orderlistmenu/' + id,
    method: 'delete'
  })
}



