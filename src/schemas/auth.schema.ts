import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Confirming the password is required')
        .oneOf([yup.ref(refString)], 'Passwords do not match')
}

export const authSchema = yup.object({
    fullname: yup.string().required('Full name is required').min(5, 'Full name must be at least 5 characters'),
    email: yup.string().required('Email is required').email('Email format is incorrect'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirm_password: handleConfirmPasswordYup('password')
})

export type AuthSchemaType = yup.InferType<typeof authSchema>
