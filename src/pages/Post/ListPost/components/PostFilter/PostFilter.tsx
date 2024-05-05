import { Box } from '@mui/material'
import MyButton from '~/components/MyButton'

export default function PostFilter() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <MyButton color='success' variant='outlined'>
                Most likes
            </MyButton>
            <MyButton color='error' variant='outlined'>
                Most view
            </MyButton>
            <MyButton color='info' variant='outlined'>
                Latest
            </MyButton>
        </Box>
    )
}
