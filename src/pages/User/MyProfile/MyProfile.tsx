import { Box, Container, Grid, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'
import { useEffect } from 'react'
import { AuthSchemaType } from '~/schemas/auth.schema'
import { omit } from 'lodash'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
})

type UpdateMeForm = Pick<AuthSchemaType, 'fullname' | 'password' | 'email'>

export default function MyProfile() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UpdateMeForm>()

    const { data: profile } = useQuery({
        queryKey: ['/users/me'],
        queryFn: () => userApi.getMe()
    })

    const updateMeMutation = useMutation({
        mutationFn: (data: Omit<UpdateMeForm, 'email'>) => userApi.updateMe(data)
    })

    useEffect(() => {
        setValue('fullname', profile?.data.result.fullname as string)
        setValue('email', profile?.data.result.email as string)
    }, [profile, setValue])

    const onSubmit = handleSubmit((data) => {
        const finalData = omit(data, 'email')
        updateMeMutation.mutate(finalData)
    })

    return (
        <Container>
            <Box sx={{ mb: 2, py: 2 }}>
                <HeadManage>Profile</HeadManage>
                <Paper elevation={0} sx={{ my: 2 }}>
                    <Box component='form' onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <MyInput
                                    fullWidth
                                    errors={errors}
                                    name='fullname'
                                    register={register}
                                    customLabel='Fullname'
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MyInput
                                    fullWidth
                                    errors={errors}
                                    name='password'
                                    register={register}
                                    customLabel='Password'
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MyInput
                                    disabled
                                    fullWidth
                                    errors={errors}
                                    name='email'
                                    register={register}
                                    customLabel='Email'
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Button
                                    sx={{ px: 5, py: 2 }}
                                    component='label'
                                    role={undefined}
                                    color='success'
                                    variant='outlined'
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload avatar
                                    <VisuallyHiddenInput type='file' />
                                </Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MyButton sx={{ mt: 3, px: 3, py: 1 }}>Update</MyButton>
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
