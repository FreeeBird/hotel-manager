import request from '@/utils/request'

const URL = 'room'

export function addRoom(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function editRoom(form) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: form
  })
}

export function delRoom(roomId) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getRoomById(roomId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getAllRoom() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

