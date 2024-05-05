import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import FormAuth from '~/components/FormAuth'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import { AppContext } from '~/contexts/app.context'
import { AuthSchemaType, authSchema } from '~/schemas/auth.schema'

type FormDataLogin = Pick<AuthSchemaType, 'email' | 'password'>
const loginSchema = authSchema.pick(['email', 'password'])
export default function Login() {
    const navigate = useNavigate()
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataLogin>({
        resolver: yupResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (body: FormDataLogin) => authApi.login(body)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setProfile(data.data.result.user)
                setIsAuthenticated(true)
                if (data.data.result.user.roles[0].name === 'ADMIN') {
                    navigate('/admin/users')
                } else {
                    navigate('/')
                }
            }
        })
    })

    return (
        <FormAuth onSubmit={onSubmit} title='Login'>
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
            </Box>
            <MyButton fullWidth sx={{ mt: 2, py: 1 }}>
                Submit
            </MyButton>
        </FormAuth>
    )
}
