import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  switch (type) {
    case 'POST':
      return axios.post(url,data)
    default:
      return axios.get(url,{params:data})
  }
}