import request from '@/utils/request'


export function apiSearchProduct(data) {
  return request({
    url: '/product/searchProduct',
    method: 'post',
    data
  })
}

export function apiListProduct() {
  return request({
    url: '/product/listProduct',
    method: 'get',
  })
}

export function apiAllProduct() {
  return request({
    url: '/product/allProduct',
    method: 'get',
  })
}

export function apiFindProductByPpid(data) {
  return request({
    url: '/product/findProductByPpid',
    method: 'post',
    data
  })
}
