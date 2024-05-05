import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, Grid, Paper } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import categoryApi from '~/apis/category.api'
import postApi from '~/apis/post.api'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyEditor from '~/components/MyEditor'
import MyInput from '~/components/MyInput'
import MySelectId from '~/components/MySelectId'
import { PostSchemaType, postSchema } from '~/schemas/post.schama'

type CreatePostForm = PostSchemaType

export default function CreatePost() {
    const [editorContent, setEditorContent] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreatePostForm>({
        resolver: yupResolver(postSchema)
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getAll()
    })

    const createPostMutation = useMutation({
        mutationFn: (data: CreatePostForm) => postApi.create(data)
    })

    const handleContentChange = (newContent: string) => {
        setEditorContent(newContent)
    }

    const onsubmit = handleSubmit((data) => {
        const finalData = {
            ...data,
            content: editorContent
        }
        createPostMutation.mutate(finalData, {
            onSuccess: () => navigate('/posts/me')
        })
    })

    return (
        <Container>
            <Box sx={{ mb: 2, py: 2 }}>
                <HeadManage>Create Post</HeadManage>
                <Paper elevation={0} sx={{ my: 2 }}>
                    <Box component='form' onSubmit={onsubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <MyInput
                                    fullWidth
                                    errors={errors}
                                    name='title'
                                    register={register}
                                    customLabel='Title'
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
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
                                <MyEditor onContentChange={handleContentChange} />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: 2 }}>
                            <MyButton color='success' sx={{ mt: 3, px: 3, py: 1 }}>
                                Create Post
                            </MyButton>
                            <Link to='/'>
                                <MyButton variant='outlined' color='warning' sx={{ mt: 3, px: 3, py: 1 }}>
                                    Back To Home
                                </MyButton>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
