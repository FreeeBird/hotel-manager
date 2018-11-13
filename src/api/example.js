import request from '@/utils/request'

const URL = 'example'

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

export function getInfo(token, username) {
  return request({
    url: URL + '/info',
    method: 'get',
    param: {
      token,
      username
    }
  })
}

export function logout() {
  return request({
    url: URL + '/logout',
    method: 'post'
  })
}
