import axios from '../http'

// 代码列表
export function codesList() {
    let res = axios.get('/codes')
    return res
}