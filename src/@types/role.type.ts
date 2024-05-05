import { ApiResponse } from './util.type'

export interface Role {
    name: string
    description: string
}

export type RoleListResponse = ApiResponse<Role[]>
