import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { FaReact } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '~/contexts/app.context'
import MyButton from '../MyButton'
import { getTokenFromLS } from '~/utils/save'
import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'

interface Setting {
    title: string
    to?: string
}

const settings: Setting[] = [
    {
        title: 'Profile',
        to: '/users/me'
    },
    {
        title: 'My Posts',
        to: '/posts/me'
    }
]

export default function HeaderClient() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleSetting = (setting: string) => {
        if (setting === 'Profile') {
            console.log('Profile')
        }
        setAnchorElUser(null)
    }
    const logoutMutation = useMutation({
        mutationFn: (token: string) => authApi.logout(token)
    })

    const handleLogout = () => {
        const token = getTokenFromLS()

        logoutMutation.mutate(token, {
            onSuccess: () => {
                setIsAuthenticated(false)
                navigate('/')
            }
        })
        setAnchorElUser(null)
    }

    return (
        <Container>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#e91e63', gap: '10px' }}>
                    <FaReact fontSize='30px' />
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='#app-bar-with-responsive-menu'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: '#e91e63',
                            letterSpacing: '.3rem',
                            fontSize: '1.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        Blog
                    </Typography>
                </Box>
                {isAuthenticated ? (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt='TVS'
                                    src='https://images.unsplash.com/photo-1603532611189-0011f036d35a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmluamF8ZW58MHx8MHx8fDA%3D'
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleSetting}
                        >
                            {settings.map((setting) => (
                                <Link key={setting.title} to={setting.to as string}>
                                    <MenuItem onClick={() => handleSetting(setting.title)}>
                                        <Typography textAlign='center'>{setting.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign='center'>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Link to='/login'>
                        <MyButton variant='outlined' color='error'>
                            Login
                        </MyButton>
                    </Link>
                )}
            </Toolbar>
        </Container>
    )
}
