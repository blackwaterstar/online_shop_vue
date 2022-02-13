import request from '@/utils/request'


export function apiListCollect(data) {
    return request({
        url: '/collect/listCollect',
        method: 'post',
        data
    })
}

export function apiAddCollection(data) {
    return request({
        url: '/collect/addCollect',
        method: 'post',
        data
    })
}

export function apiDeleteCollect(data) {
    return request({
        url: '/collect/deleteCollect',
        method: 'post',
        data
    })
}