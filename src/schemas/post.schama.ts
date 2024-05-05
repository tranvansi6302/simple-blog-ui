import * as yup from 'yup'

export const postSchema = yup.object({
    title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
    category_id: yup.string().required('Category is required'),
    content: yup.string()
})

export type PostSchemaType = yup.InferType<typeof postSchema>
