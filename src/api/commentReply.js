import request from '@/utils/request'

export function apiSelectCommentReply(data) {
    return request({
        url: '/commentReply',
        method: 'get',
        data
    })
}

export function apiAddCommentReply(data) {
    return request({
        url: '/commentReply',
        method: 'post',
        data
    })
}

export function apiDeleteCommentReply(data) {
    return request({
        url: '/commentReply',
        method: 'delete',
        data
    })
}