import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Post } from '~/@types/post.type'
import MyButton from '~/components/MyButton'

interface PostItemProps {
    post: Post
}

export default function PostItem({ post }: PostItemProps) {
    return (
        <Card elevation={0} sx={{ border: '1px solid #f8f3f3' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'violet' }} aria-label='recipe'>
                        S
                    </Avatar>
                }
                action={
                    <IconButton aria-label='settings'>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.author.fullname}
                subheader='May 5, 2024'
            />
            <CardMedia component='img' height='220' image={post.thumbnail} alt='Post Image' />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    {post.title}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} disableSpacing>
                <Box>
                    <IconButton aria-label='add to favorites'>
                        <FavoriteIcon sx={{ color: 'pink' }} />
                    </IconButton>
                    <IconButton aria-label='share'>
                        <ShareIcon />
                    </IconButton>
                </Box>
                <MyButton size='small' color='warning' variant='outlined'>
                    {post.category.name}
                </MyButton>
            </CardActions>
        </Card>
    )
}
