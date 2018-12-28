import axios from 'axios'

const baseUrl = 'http://localhost:4000'

export default function ajax(url, data = {}, type = 'GET') {
  // url = baseUrl + url
  switch (type) {
    case 'POST':
      return axios.post(url, data)
    default:
      return axios.get(url, {params: data})
  }
}