import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { MdAdminPanelSettings } from 'react-icons/md'
import { MouseEvent, useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLS } from '~/utils/save'
import { AppContext } from '~/contexts/app.context'

const settings = ['Logout']

export default function HeaderAdmin() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AppContext)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const logoutMutation = useMutation({
        mutationFn: (token: string) => authApi.logout(token)
    })

    const handleClickItem = (setting: string) => {
        const token = getTokenFromLS()
        if (setting === 'Logout') {
            logoutMutation.mutate(token, {
                onSuccess: () => {
                    setIsAuthenticated(false)
                    navigate('/login')
                }
            })
        }
        setAnchorElUser(null)
    }

    return (
        <AppBar
            sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.grey[100]}`
            }}
            elevation={0}
            color='inherit'
            position='static'
        >
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'gray' }}>
                        <MdAdminPanelSettings fontSize='30px' />
                        <Typography
                            sx={{
                                fontSize: 25,
                                fontWeight: 'fontWeightBold',
                                letterSpacing: '3px',
                                mt: 0.5
                            }}
                        >
                            ADMIN
                        </Typography>
                    </Box>

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
                            onClose={handleClickItem}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleClickItem(setting)}>
                                    <Typography textAlign='center'>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
