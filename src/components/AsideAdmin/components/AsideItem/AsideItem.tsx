import { Box, ListItemButton } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { Link } from 'react-router-dom'
import { usePathname } from '~/hooks/usePathname'
import { NavConfig } from '../../AsideAdmin'

interface NavItemProps {
    item: NavConfig
}

export default function AsideItem({ item }: NavItemProps) {
    const pathname = usePathname()

    const active = item.path === pathname

    return (
        <Link to={item.path}>
            <ListItemButton
                sx={{
                    minHeight: 44,
                    borderRadius: 0.75,
                    typography: 'body2',
                    color: 'text.secondary',
                    textTransform: 'capitalize',
                    fontWeight: 'fontWeightMedium',
                    ...(active && {
                        color: 'primary.main',
                        fontWeight: 'fontWeightSemiBold',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16)
                        }
                    })
                }}
            >
                <Box component='span' sx={{ width: 24, height: 24, mr: 2 }}>
                    {item.icon}
                </Box>

                <Box component='span'>{item.title} </Box>
            </ListItemButton>
        </Link>
    )
}
