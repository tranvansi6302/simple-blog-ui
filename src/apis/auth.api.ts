import { AuthResponse, LoginResponse } from '~/@types/auth.type'
import { MessageResponse } from '~/@types/util.type'
import { AuthSchemaType } from '~/schemas/auth.schema'
import http from '~/utils/http'

type RegisterRequest = AuthSchemaType

type LoginRequest = Pick<AuthSchemaType, 'email' | 'password'>

const authApi = {
    register: (body: RegisterRequest) => {
        return http.post<AuthResponse>('/auth/register', body)
    },
    login: (body: LoginRequest) => {
        return http.post<LoginResponse>('/auth/login', body)
    },

    logout: (token: string) => {
        return http.post<MessageResponse>('/auth/logout', token)
    }
}

export default authApi
