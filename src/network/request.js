import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL:'http://123.207.32.32:8000/',
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 3000
  }) 

  //请求拦截
  instance.interceptors.request.use(config => {
    return config;
  },err => {
    console.log(err)
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },error => {
    console.log(error)
  })


  return instance(config)
}