import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { LoginResponse } from '~/@types/auth.type'
import { ErrorResponse } from '~/@types/util.type'
import { clearProfileFromLS, clearTokenFromLS, getTokenFromLS, saveProfileToLS, saveTokenToLS } from './save'

class Http {
    instance: AxiosInstance
    private token: string
    constructor() {
        this.token = getTokenFromLS()
        this.instance = axios.create({
            baseURL: 'http://localhost:8080/api/v2',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.authorization = `Bearer ${this.token}`
                return config
            }

            return config
        })

        this.instance.interceptors.response.use(
            (response) => {
                if (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Created) {
                    const data = response.data as ErrorResponse
                    const message = data.message
                    if (message) {
                        toast.success(message)
                    }
                    // Save token to local storage
                    const { url } = response.config
                    if (url === '/auth/login') {
                        this.token = (response.data as LoginResponse).result.token
                        const profile = (response?.data as LoginResponse).result.user
                        saveTokenToLS(this.token)
                        saveProfileToLS(profile)
                    } else if (url === '/auth/logout') {
                        this.token = ''
                        clearTokenFromLS()
                        clearProfileFromLS()
                    }
                }
                return response
            },
            (error: AxiosError) => {
                const data = error.response?.data as ErrorResponse
                const message = data?.message || error.message
                toast.error(message)
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance
export default http
