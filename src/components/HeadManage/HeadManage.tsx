import { Box, Typography } from '@mui/material'
import MyButton from '../MyButton'
import { Link } from 'react-router-dom'

interface HeadManageProps {
    children: React.ReactNode
    isButton?: boolean
    textButton?: string
    to?: string
}

export default function HeadManage({ children, isButton, textButton, to }: HeadManageProps) {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'gray' }}>
                <Typography
                    sx={{
                        fontSize: '22px',
                        fontWeight: 'semibold',
                        textTransform: 'uppercase'
                    }}
                    component='p'
                >
                    {children}
                </Typography>
            </Box>
            {isButton && (
                <Link to={to as string}>
                    <MyButton>{textButton}</MyButton>
                </Link>
            )}
        </Box>
    )
}
