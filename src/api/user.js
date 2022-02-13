import request from '@/utils/request'

export function apiLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function apiCheckUser(data) {
  return request({
    url: '/user/checkUser',
    method: 'post',
    data
  })
}

// export function apiLogout() {
//   return request({
//     url: '/user/1',
//     method: 'get'
//   })
// }

export function apiRegister(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function apiModifyInfo(data) {
  return request({
    url: '/user/modifyInfo',
    method: 'post',
    data
  })
}
