import { FaUserCheck } from 'react-icons/fa'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { IoNewspaperOutline } from 'react-icons/io5'
import { alpha } from '@mui/material/styles'
import { TbCategoryMinus } from 'react-icons/tb'
import { NAV } from '~/constants/config'
import AsideItem from './components/AsideItem'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'

export interface NavConfig {
    title: string
    path: string
    icon: JSX.Element
}

const navConfig: NavConfig[] = [
    {
        title: 'Manage User',
        path: '/admin/users',
        icon: <FaUserCheck fontSize='22px' />
    },
    {
        title: 'Manage Post',
        path: '/admin/posts',
        icon: <IoNewspaperOutline fontSize='22px' />
    },
    {
        title: 'Manage Category',
        path: '/admin/categories',
        icon: <TbCategoryMinus fontSize='22px' />
    }
]

export default function AsideAdmin() {
    const { profile } = useContext(AppContext)
    console.log(profile)

    const renderAccount = (
        <Box
            sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme: any) => alpha(theme.palette.grey[500], 0.12)
            }}
        >
            <Avatar src={'none'} alt='photoURL' />

            <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle2'>{profile?.fullname}</Typography>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {profile?.roles[0].name}
                </Typography>
            </Box>
        </Box>
    )
    const renderMenu = (
        <Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
            {navConfig.map((item) => (
                <AsideItem key={item.title} item={item} />
            ))}
        </Stack>
    )
    const renderContent = (
        <Box
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            {renderAccount}
            {renderMenu}
            <Box sx={{ flexGrow: 1 }} />
        </Box>
    )
    return (
        <Box
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.WIDTH }
            }}
        >
            <Box
                sx={{
                    height: 1,
                    position: 'fixed',
                    width: NAV.WIDTH,
                    borderRight: (theme) => `solid 1px ${theme.palette.grey[100]}`
                }}
            >
                {renderContent}
            </Box>
        </Box>
    )
}
