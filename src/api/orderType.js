import request from '@/utils/request'

const URL = 'orderType'

export function add(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function del(data) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      typeId: data
    }
  })
}

export function update(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}

export function getById(data) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      typeId: data
    }
  })
}

export function getAll() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}
