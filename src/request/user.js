import axios from '../http'

// 登录
export function login(data) {
    let res = axios.post('/users/login', data)
    return res
}