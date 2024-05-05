import { PostStatus } from '~/constants/config'
import { ApiResponse } from './util.type'
import { Category } from './category.type'
import { User } from './user.type'

export interface Post {
    id: string
    title: string
    thumbnail: string
    content: string
    status: PostStatus
    category: Category
    author: User
}

export type PostListResponse = ApiResponse<Post[]>
export type PostResponse = ApiResponse<Post>
