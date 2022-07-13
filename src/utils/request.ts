import axios, { AxiosResponse } from "axios";
const request = axios.create({ })

// 响应拦截
request.interceptors.response.use((resp:AxiosResponse)=>{
    return resp.data
},err=>{
    //
})

export {
    request
}