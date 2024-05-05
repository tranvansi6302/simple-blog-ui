import { Box, Grid, Paper, SelectChangeEvent } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import roleApi from '~/apis/role.api'
import userApi from '~/apis/user.api'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import MySelect from '~/components/MySelect'
import { AuthSchemaType } from '~/schemas/auth.schema'

type FormData = Pick<AuthSchemaType, 'fullname' | 'email' | 'password'> & { roles: string[] }

export default function UpdateUser() {
    const [selectedValue, setSelectedValue] = useState<string>('')
    const { id: userId } = useParams<{ id: string }>()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>()

    const { data: user } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => userApi.getById(userId as string),
        placeholderData: keepPreviousData
    })

    const { data: roles } = useQuery({
        queryKey: ['roles'],
        queryFn: () => roleApi.getAll()
    })

    const updateUserMutation = useMutation({
        mutationFn: (data: FormData) => userApi.update(userId as string, data)
    })

    useEffect(() => {
        setValue('fullname', user?.data.result.fullname as string)
        setValue('email', user?.data.result.email as string)
        setSelectedValue(user?.data.result.roles[0].name as string)
    }, [setValue, user])

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value)
    }

    const onSubmit = handleSubmit((data) => {
        const body = {
            ...data,
            roles: [selectedValue]
        }

        updateUserMutation.mutate(body)
    })

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <HeadManage>Update User</HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <Box component='form' onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <MyInput
                                fullWidth
                                errors={errors}
                                name='fullname'
                                register={register}
                                customLabel='Fullname'
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <MyInput
                                fullWidth
                                errors={errors}
                                name='password'
                                register={register}
                                customLabel='Password'
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <MyInput
                                disabled
                                fullWidth
                                errors={errors}
                                name='email'
                                register={register}
                                customLabel='Email'
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <MySelect
                                name='roles'
                                register={register}
                                value={selectedValue}
                                options={roles?.data.result}
                                customLabel='Role'
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MyButton sx={{ mt: 3, px: 3, py: 1 }}>Update User</MyButton>
                        <Link to='/admin/users'>
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
