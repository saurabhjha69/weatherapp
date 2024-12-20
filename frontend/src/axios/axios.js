import axios from "axios"

const token = localStorage.getItem("token")
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        'authorization' : `Bearer ${token ? token : ""}`
    }
})

export default axiosInstance