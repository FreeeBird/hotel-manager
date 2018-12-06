import request from '@/utils/request'

const URL = 'user'

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

export function addUser(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function getAllUser() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

export function getUserById(userId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      userId
    }
  })
}

export function updateUser(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}

export function delUser(id) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      userId: id
    }
  })
}

