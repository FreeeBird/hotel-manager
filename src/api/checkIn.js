import request from '@/utils/request'

const URL = 'checkIn'

export function checkIn(data) {
  return request({
    url: URL + '/in',
    method: 'post',
    data: data
  })
}

export function checkOut(roomNumber) {
  return request({
    url: URL + '/out',
    method: 'post',
    data: {
      roomNumber: roomNumber
    }
  })
}
