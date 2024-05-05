import { Box, Grid, Paper } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import categoryApi from '~/apis/category.api'
import postApi from '~/apis/post.api'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyEditor from '~/components/MyEditor'
import MyInput from '~/components/MyInput'
import MySelectId from '~/components/MySelectId'
import { PostSchemaType } from '~/schemas/post.schama'

type UpdatePostForm = PostSchemaType

export default function UpdateMyPost() {
    const [editorContent, setEditorContent] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const { id: postId } = useParams<{ id: string }>()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UpdatePostForm>()

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getAll()
    })

    const { data: post } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => postApi.getById(postId as string)
    })

    const updatePostMutation = useMutation({
        mutationFn: (data: UpdatePostForm) => postApi.update(postId as string, data)
    })

    const handleContentChange = (newContent: string) => {
        setEditorContent(newContent)
    }

    useEffect(() => {
        setValue('title', post?.data.result.title as string)
        setSelectedCategory(post?.data.result.category.id as string)
        setValue('category_id', post?.data.result.category.id as string)
        setEditorContent(post?.data.result.content as string)
        console.log(post?.data.result.status)
    }, [post, setValue])

    const onsubmit = handleSubmit((data) => {
        const body: UpdatePostForm = {
            ...data,
            content: editorContent || ''
        }
        updatePostMutation.mutate(body)
    })

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <HeadManage>Update Post</HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <Box component='form' onSubmit={onsubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <MyInput fullWidth errors={errors} name='title' register={register} customLabel='Title' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MySelectId
                                errors={errors}
                                name='category_id'
                                register={register}
                                value={selectedCategory}
                                options={categories?.data.result}
                                customLabel='Category'
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <MyEditor
                                initialContent={post?.data.result.content as string}
                                onContentChange={handleContentChange}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: 5 }}>
                        <MyButton sx={{ mt: 3, px: 3, py: 1 }}>Update Post</MyButton>
                        <Link to='/posts/me'>
                            <MyButton variant='outlined' color='warning' sx={{ mt: 3, px: 3, py: 1 }}>
                                Back To List
                            </MyButton>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
