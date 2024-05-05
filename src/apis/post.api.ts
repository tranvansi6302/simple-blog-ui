import { PostListResponse, PostResponse } from '~/@types/post.type'
import { MessageResponse } from '~/@types/util.type'
import { PostStatus } from '~/constants/config'
import { PostSchemaType } from '~/schemas/post.schama'
import http from '~/utils/http'

type UpdatePostRequest = PostSchemaType & { status: PostStatus }
type UpdateMePostRequest = PostSchemaType
type CreatePostRequest = PostSchemaType

const postApi = {
    getAll: () => {
        return http.get<PostListResponse>('/posts')
    },
    getByStatus: (status: string) => {
        return http.get<PostListResponse>(`/posts/status/${status}`)
    },
    getMyPosts: () => {
        return http.get<PostListResponse>('/posts/me')
    },
    getById: (id: string) => {
        return http.get<PostResponse>(`/posts/${id}`)
    },
    update: (id: string, data: UpdatePostRequest | UpdateMePostRequest) => {
        return http.patch<PostResponse>(`/posts/${id}`, data)
    },
    delete: (id: string) => {
        return http.delete<MessageResponse>(`/posts/${id}`)
    },
    create: (data: CreatePostRequest) => {
        return http.post<CreatePostRequest>('/posts', data)
    }
}
export default postApi
