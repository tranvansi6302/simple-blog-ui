import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Paper } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import categoryApi from '~/apis/category.api'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import { CategorySchemaType, categorySchema } from '~/schemas/category.schema'

type FormDataCreate = CategorySchemaType

export default function CreateCategory() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataCreate>({
        resolver: yupResolver(categorySchema)
    })

    const createCategoryMutation = useMutation({
        mutationFn: (data: FormDataCreate) => categoryApi.create(data)
    })

    const onSubmit = handleSubmit((data) => {
        createCategoryMutation.mutate(data, {
            onSuccess: () => navigate('/admin/categories')
        })
    })

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <HeadManage>Create Category</HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <Box component='form' onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <MyInput fullWidth errors={errors} name='name' register={register} customLabel='Name' />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MyButton sx={{ mt: 3, px: 3, py: 1 }}>Create Category</MyButton>
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
