import axios from 'axios'

export default axios.create({
  baseURL: 'https://morning-oasis-87545.herokuapp.com/api'
})