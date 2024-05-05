import { Box } from '@mui/material'
import AsideAdmin from '~/components/AsideAdmin'
import HeaderAdmin from '~/components/HeaderAdmin'
import { NAV } from '~/constants/config'

interface AminLayoutProps {
    children: React.ReactNode
}

export default function AminLayout({ children }: AminLayoutProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ width: NAV.WIDTH }}>
                <AsideAdmin />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <HeaderAdmin />
                {children}
            </Box>
        </Box>
    )
}
