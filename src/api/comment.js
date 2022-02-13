import request from '@/utils/request'


export function apiSelectCommentById(data) {
    return request({
        url: '/comment/selectCommentById',
        method: 'post',
        data
    })
}

export function apiSelectListComment(data) {
    return request({
        url: '/comment/selectListComment',
        method: 'post',
        data
    })
}
export function selectListCommentByOrderId(data) {
    return request({
        url: '/comment/selectListCommentByOrderId',
        method: 'post',
        data
    })
}

export function apiAddComment(data) {
    return request({
        url: '/comment/addComment',
        method: 'post',
        data
    })
}

export function apiDeleteComment(data) {
    return request({
        url: '/comment/deleteComment',
        method: 'post',
        data
    })
}



