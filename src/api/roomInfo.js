import request from '@/utils/request'

const URL = 'room'

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

export function del(roomId) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getById(roomId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getAll() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

