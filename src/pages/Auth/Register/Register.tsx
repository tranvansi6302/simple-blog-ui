import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import FormAuth from '~/components/FormAuth'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import { AuthSchemaType, authSchema } from '~/schemas/auth.schema'

type FormDataRegister = AuthSchemaType
const registerSchema = authSchema

export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataRegister>({
        resolver: yupResolver(registerSchema)
    })

    const registerMutation = useMutation({
        mutationFn: (body: FormDataRegister) => authApi.register(body)
    })

    const onsubmit = handleSubmit((data) => {
        registerMutation.mutate(data, {
            onSuccess: () => navigate('/login')
        })
    })

    return (
        <FormAuth onSubmit={onsubmit} title='Register'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}
            >
                <MyInput
                    fullWidth
                    register={register}
                    name='fullname'
                    label='Full Name'
                    autocomplete='fullname'
                    color='primary'
                    errors={errors}
                />
                <MyInput
                    fullWidth
                    register={register}
                    name='email'
                    label='Email'
                    autocomplete='email'
                    color='primary'
                    errors={errors}
                />
                <MyInput
                    fullWidth
                    type='password'
                    register={register}
                    name='password'
                    label='Password'
                    color='primary'
                    autocomplete='new-password'
                    errors={errors}
                />
                <MyInput
                    fullWidth
                    type='password'
                    register={register}
                    name='confirm_password'
                    label='Confirm Password'
                    autocomplete='new-password'
                    color='primary'
                    errors={errors}
                />
            </Box>
            <MyButton fullWidth sx={{ mt: 2, py: 1 }}>
                Submit
            </MyButton>
        </FormAuth>
    )
}
