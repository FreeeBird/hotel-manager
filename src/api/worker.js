import request from '@/utils/request'

const URL = 'worker'

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

export function getAll() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

