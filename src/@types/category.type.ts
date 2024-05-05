import { ApiResponse } from './util.type'

export interface Category {
    id: string
    name: string
}

export type CategoryListResponse = ApiResponse<Category[]>
export type CategoryResponse = ApiResponse<Category>
