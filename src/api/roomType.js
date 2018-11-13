import request from '@/utils/request'

const URL = 'roomType'

export function add(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function edit(form) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: form
  })
}

export function del(typeId) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      typeId
    }
  })
}

export function getById(typeId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      typeId
    }
  })
}

export function getAll() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

