import { Box, Container } from '@mui/material'
import FooterClient from '~/components/FooterClient'
import HeaderClient from '~/components/HeaderClient'

interface ClientLayoutProps {
    children: React.ReactNode
}
export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <Box>
            <HeaderClient />
            <Container>{children}</Container>
            <FooterClient />
        </Box>
    )
}
