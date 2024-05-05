import { CategoryListResponse, CategoryResponse } from '~/@types/category.type'
import { MessageResponse } from '~/@types/util.type'
import { CategorySchemaType } from '~/schemas/category.schema'
import http from '~/utils/http'

type CategoryRequest = CategorySchemaType

const categoryApi = {
    create: (data: CategoryRequest) => {
        return http.post<CategoryResponse>('/categories', data)
    },
    getAll: () => {
        return http.get<CategoryListResponse>('/categories')
    },
    getById: (id: string) => {
        return http.get<CategoryResponse>(`/categories/${id}`)
    },
    update: (id: string, data: CategoryRequest) => {
        return http.patch<CategoryRequest>(`/categories/${id}`, data)
    },
    delete: (id: string) => {
        return http.delete<MessageResponse>(`/categories/${id}`)
    }
}
export default categoryApi
