import request from '@/utils/request'


export function apiGetList(data) {
    return request({
        url: '/order/list',
        method: 'post',
        data
    })
}

export function apiGetOrder(data) {
    return request({
        url: '/order/getOrder',
        method: 'post',
        data
    })
}
export function apiGetList1(data) {
    return request({
        url: '/order/list1',
        method: 'post',
        data
    })
}

export function apiGetList2(data) {
    return request({
        url: '/order/list2',
        method: 'post',
        data
    })
}

export function apiAddOrder(data) {
    return request({
        url: '/order/addOrder',
        method: 'post',
        data
    })
}

export function apiUpdatestatme(data) {
    return request({
        url: '/order/updatestatme',
        method: 'post',
        data
    })
}
export function apiUpdateOrder(data) {
    return request({
        url: '/order/updateOrder',
        method: 'post',
        data
    })
}




