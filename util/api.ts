import axios from 'axios'
import {logOut} from "./auth";

export default function api() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
  })

  api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
      logOut()

      return Promise.reject({status: 401, errors: ['Unauthorized']})
    }

    if (error.response?.status === 422) {
      let errors = Object.values(error?.response?.data?.errors || {})

      return Promise.reject({status: 422, errorsRaw: errors, errors: errors.reduce(error => error)})
    }

    console.error(error)

    return Promise.reject({status: error.response?.status, errors: ['Oops!']})
  })

  return api
}