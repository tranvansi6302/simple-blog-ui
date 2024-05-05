import { Role } from './role.type'
import { ApiResponse } from './util.type'

export interface User {
    id: string
    fullname: string
    email: string
    roles: Role[]
}

export type UserResponse = ApiResponse<User>

export type UserListResponse = ApiResponse<User[]>
