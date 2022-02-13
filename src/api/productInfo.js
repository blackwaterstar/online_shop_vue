import request from '@/utils/request'

export function apiSelectProductInfo(data) {
    return request({
        url: '/productInfo/selectProductInfo',
        method: 'post',
        data
    })
}

export function apiSelectListProductInfo(data) {
    return request({
        url: '/productInfo/selectListProductInfo',
        method: 'post',
        data
    })
}

export function apiSalesProduct(data) {
    return request({
        url: '/productInfo/salesProduct',
        method: 'post',
        data
    })
}

