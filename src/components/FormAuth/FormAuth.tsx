import { Box, Container, Typography } from '@mui/material'

interface FormAuthProps {
    title: string
    children: React.ReactNode
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function FormAuth({ title, children, onSubmit }: FormAuthProps) {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '10px'
            }}
        >
            <Box
                component='form'
                onSubmit={onSubmit}
                sx={{
                    width: '400px'
                }}
            >
                <Typography
                    mb={2}
                    textAlign='center'
                    display='flex'
                    justifyContent='start'
                    alignItems='center'
                    gap='8px'
                    color='gray'
                    fontWeight='500'
                    variant='h4'
                    textTransform='uppercase'
                >
                    {title}
                </Typography>

                <Box>{children}</Box>
            </Box>
        </Container>
    )
}
