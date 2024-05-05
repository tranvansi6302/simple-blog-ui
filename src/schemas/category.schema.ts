import * as yup from 'yup'

export const categorySchema = yup.object({
    name: yup.string().required('Category name is required').min(2, 'Category name must be at least 2 characters')
})

export type CategorySchemaType = yup.InferType<typeof categorySchema>
