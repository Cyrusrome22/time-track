import axios from "axios"
import history from "utilities/history"

// Axios instance to make single config for all API Calls
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
})

instance.interceptors.request.use((config) => {
  const url = `/api${config.url}`
  config.url = url
  if (config.url === "/api/auth/login") return config
  if (config.url === "/api/auth/register") return config

  const token = localStorage.getItem("token")
  if (!token) history.push("/login")
  config.headers["Authorization"] = "Token " + token

  if (config.url === "/api/auth/logout") {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
  }
  return config
})

instance.interceptors.response.use((res) => {
  return res
})

export default instance
