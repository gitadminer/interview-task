import {request} from '../utils/request'

export function getRate(type: string) {
    return request({
        method: 'get',
        url: 'https://api.exchangerate.host/latest',
        params: {
            base: type,
            symbols: 'CNY,RUB,USD'
        }
    })
}