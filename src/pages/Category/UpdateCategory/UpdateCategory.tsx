import { Box, Grid, Paper } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import categoryApi from '~/apis/category.api'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import { CategorySchemaType } from '~/schemas/category.schema'

type FormDataUpdate = CategorySchemaType

export default function UpdateCategory() {
    const { id: categoryId } = useParams<{ id: string }>()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormDataUpdate>()

    const { data: category } = useQuery({
        queryKey: ['categories', categoryId],
        queryFn: () => categoryApi.getById(categoryId as string)
    })

    useEffect(() => {
        setValue('name', category?.data.result.name as string)
    }, [category, setValue])

    const updateCategoryMutation = useMutation({
        mutationFn: (data: FormDataUpdate) => categoryApi.update(categoryId as string, data)
    })

    const onSubmit = handleSubmit((data) => {
        updateCategoryMutation.mutate(data)
    })

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <HeadManage>Update Category</HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <Box component='form' onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <MyInput fullWidth errors={errors} name='name' register={register} customLabel='Name' />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MyButton sx={{ mt: 3, px: 3, py: 1 }}>Update Category</MyButton>
                        <Link to='/admin/categories'>
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
