import request from '@/utils/request'

const URL = 'operator'

export function login(username, password) {
  return request({
    url: URL + '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function add(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function getAll() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

export function getById(workerId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      workerId
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

export function del(workerId) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      workerId
    }
  })
}

