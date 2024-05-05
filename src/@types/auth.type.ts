import { User } from './user.type'
import { ApiResponse } from './util.type'

export type AuthResponse = ApiResponse<User>
export type LoginResponse = ApiResponse<{
    token: string
    user: User
}>
