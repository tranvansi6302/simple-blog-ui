import { UserListResponse, UserResponse } from '~/@types/user.type'
import { MessageResponse } from '~/@types/util.type'
import { AuthSchemaType } from '~/schemas/auth.schema'
import http from '~/utils/http'

type UpdateUserRequest = Pick<AuthSchemaType, 'fullname' | 'email' | 'password'> & { roles: string[] }
type MeUpdateRequest = Pick<AuthSchemaType, 'fullname' | 'password'>

const userApi = {
    getMe: () => {
        return http.get<UserResponse>('/users/me')
    },
    getAll: () => {
        return http.get<UserListResponse>('/users')
    },
    getById: (id: string) => {
        return http.get<UserResponse>(`/users/${id}`)
    },
    update: (id: string, data: UpdateUserRequest) => {
        return http.patch<UserResponse>(`/users/${id}`, data)
    },
    updateMe: (data: MeUpdateRequest) => {
        return http.patch<UserResponse>('/users/me', data)
    },
    delete: (id: string) => {
        return http.delete<MessageResponse>(`/users/${id}`)
    }
}
export default userApi
