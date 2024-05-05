import { Box, Grid } from '@mui/material'
import PostItem from './components/PostItem'
import PostFilter from './components/PostFilter'
import MyButton from '~/components/MyButton'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PostStatus } from '~/constants/config'
import postApi from '~/apis/post.api'

export default function ListPost() {
    const { data: posts } = useQuery({
        queryKey: ['posts/status'],
        queryFn: () => postApi.getByStatus(PostStatus.APPROVED)
    })

    return (
        <Box sx={{ m: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', mb: 4 }}>
                <Box sx={{ '@media screen and (max-width: 600px)': { display: 'none' } }}>
                    <PostFilter />
                </Box>
                <Link to='/posts/create'>
                    <MyButton color='secondary' variant='contained'>
                        Create New Post
                    </MyButton>
                </Link>
            </Box>
            <Grid container spacing={2}>
                {posts?.data.result &&
                    posts?.data.result.map((post) => (
                        <Grid key={post.id} item lg={4} md={6}>
                            <PostItem post={post} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )
}
