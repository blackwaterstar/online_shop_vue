import request from '@/utils/request'

export function apiSelectType(data) {
    return request({
        url: '/type/selectType',
        method: 'post',
        data
    })
}