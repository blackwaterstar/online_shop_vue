import request from '@/utils/request'


export function apiGetUserCart(data) {
    return request({
        url: '/cart/getUserCart',
        method: 'post',
        data
    })
}

export function apiAddCart(data) {
    return request({
        url: '/cart/addCart',
        method: 'post',
        data
    })
}

export function apiCancelCart(data) {
    return request({
        url: '/cart/deleteCart',
        method: 'post',
        data
    })
}

export function apiDeleteListCart(data) {
    return request({
        url: '/cart/deleteListCart',
        method: 'post',
        data
    })
}


