import request from '@/utils/request'

const URL = 'orderType'

export function addOrderType(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function delOrderType(data) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      typeId: data
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

export function getOrderTypeById(data) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      typeId: data
    }
  })
}

export function getAllOrderType() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}
