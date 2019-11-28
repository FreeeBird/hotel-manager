import request from '@/utils/request'

const URL = 'op/user'


export function addUser(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function getAllUser() {
  return request({
    url: URL + '',
    method: 'post'
  })
}

export function getUserCount() {
  return request({
    url: URL + '/count',
    method: 'post'
  })
}

export function getUserById(userId) {
  return request({
    url: URL + '/'+userId,
    method: 'post',
    data: {

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
    url: URL + '/delete/'+id,
    method: 'post',
    data: {
    }
  })
}

