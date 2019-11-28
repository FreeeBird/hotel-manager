import request from '@/utils/request'

const URL = 'op/room'

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
    url: URL + '/delete/'+roomId,
    method: 'post',
    data: {

    }
  })
}

export function getRoomById(roomId) {
  return request({
    url: URL + '/'+roomId,
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getAllRoom() {
  return request({
    url: URL,
    method: 'post'
  })
}

