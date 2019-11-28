import request from '@/utils/request'

const URL = 'op/order-type'

export function addOrderType(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function delOrderType(id) {
  return request({
    url: URL + '/delete/'+id,
    method: 'post',
    data: {

    }
  })
}

export function updateOrderType(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}

export function getOrderTypeById(id) {
  return request({
    url: URL + '/'+id,
    method: 'post',
    data: {

    }
  })
}

export function getAllOrderType() {
  return request({
    url: URL,
    method: 'post'
  })
}
