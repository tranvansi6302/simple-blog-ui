import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import postApi from '~/apis/post.api'
import ConfirmDelete from '~/components/ConfirmDelete'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyTableHead from '~/components/TableHead/TableHead'
import { PostStatus, configTablePost } from '~/constants/config'
import { queryClient } from '~/main'

export default function ManagePostList() {
    const [open, setOpen] = useState<boolean>(false)
    const postId = useRef<string>('')
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: () => postApi.getAll(),
        placeholderData: keepPreviousData
    })

    const deletePostMutation = useMutation({
        mutationFn: (id: string) => postApi.delete(id)
    })

    const handleDeletePost = (id: string) => {
        postId.current = id
        setOpen(true)
    }

    const handleConfirmDelete = () => {
        deletePostMutation.mutate(postId.current, {
            onSuccess: () => {
                setOpen(false)
                queryClient.invalidateQueries({
                    queryKey: ['posts']
                })
            }
        })
    }

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <ConfirmDelete open={open} setOpen={setOpen} onConfirm={handleConfirmDelete} />
            <HeadManage>Manage Post</HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <TableContainer>
                    <Table>
                        <MyTableHead data={configTablePost} />
                        <TableBody>
                            {posts?.data.result &&
                                posts?.data.result.map((post, index) => (
                                    <TableRow key={post.id}>
                                        <TableCell align='left'>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell align='left'>{index + 1}</TableCell>
                                        <TableCell align='left'>
                                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <img
                                                    style={{ borderRadius: '50%' }}
                                                    width='40px'
                                                    height='40px'
                                                    src={post.thumbnail}
                                                    alt='image-post'
                                                />
                                                <Typography
                                                    sx={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                    variant='body2'
                                                >
                                                    {post.title}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align='left'>{post.author.fullname}</TableCell>
                                        <TableCell align='left'>
                                            <MyButton
                                                type='button'
                                                color={
                                                    post.status === PostStatus.UNAPPROVED
                                                        ? 'warning'
                                                        : post.status === PostStatus.APPROVED
                                                          ? 'success'
                                                          : 'error'
                                                }
                                                variant='outlined'
                                            >
                                                {post.status}
                                            </MyButton>
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Box sx={{ display: 'flex', gap: '5px' }}>
                                                <Link to={`/admin/posts/update/${post.id}`}>
                                                    <MyButton type='button' variant='outlined' color='success'>
                                                        Edit
                                                    </MyButton>
                                                </Link>
                                                <MyButton
                                                    onClick={() => handleDeletePost(post.id)}
                                                    type='button'
                                                    variant='outlined'
                                                    color='error'
                                                >
                                                    Delete
                                                </MyButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}
