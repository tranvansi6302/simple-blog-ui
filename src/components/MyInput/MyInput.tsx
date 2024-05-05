import { Box, InputLabel, TextField, TextFieldPropsColorOverrides } from '@mui/material'
import { UseFormRegister } from 'react-hook-form'
import { OverridableStringUnion } from '@mui/types'

interface MyInputProps {
    register?: UseFormRegister<any>
    errors: boolean | any
    name: string
    label?: string
    fullWidth?: boolean
    color?:
        | OverridableStringUnion<
              'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning',
              TextFieldPropsColorOverrides
          >
        | undefined
    type?: React.HTMLInputTypeAttribute
    autocomplete?: string
    disabled?: boolean
    customLabel?: string
}

export default function MyInput({
    register,
    errors,
    name,
    label,
    color,
    type = 'text',
    autocomplete,
    fullWidth,
    customLabel,
    disabled
}: MyInputProps) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false
    return (
        <Box>
            {customLabel && <InputLabel sx={{ mb: 0.5 }}>{customLabel}</InputLabel>}
            <TextField
                {...registerResult}
                error={errorResult}
                helperText={errors[name]?.message}
                color={color}
                label={label && label}
                {...(fullWidth && { fullWidth: true })}
                autoComplete={autocomplete}
                type={type}
                disabled={disabled}
            />
        </Box>
    )
}
