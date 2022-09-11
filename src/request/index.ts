import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers = config.headers || {}
  if (token) {
    config.headers.token = token || ''
  }
  return config
})

service.interceptors.response.use((res) => {
  const code = res.data.code
  if ( code !== 200 ) {
    return Promise.reject(res.data)
  }
  return res.data
}, (err) => {
  console.warn(err)
})

export default service
