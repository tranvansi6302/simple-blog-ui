import { Theme } from '@emotion/react'
import { Button, ButtonPropsColorOverrides, ButtonPropsVariantOverrides, SxProps } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
interface MyButtonProps {
    children: React.ReactNode
    variant?: OverridableStringUnion<'text' | 'contained' | 'outlined', ButtonPropsVariantOverrides> | undefined
    onClick?: () => void
    color?:
        | OverridableStringUnion<
              'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
              ButtonPropsColorOverrides
          >
        | undefined
    sx?: SxProps<Theme> | undefined
    size?: 'small' | 'medium' | 'large'

    fullWidth?: boolean
    type?: 'submit' | 'button' | 'reset'
}

export default function MyButton({
    children,
    variant = 'contained',
    color = 'primary',
    sx,
    size = 'medium',
    fullWidth = false,
    onClick,
    type = 'submit'
}: MyButtonProps) {
    return (
        <Button onClick={onClick} size={size} sx={sx} type={type} variant={variant} color={color} fullWidth={fullWidth}>
            {children}
        </Button>
    )
}
