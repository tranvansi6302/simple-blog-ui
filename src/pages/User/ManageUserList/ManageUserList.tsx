import { Box, Checkbox, Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import Table from '@mui/material/Table'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import userApi from '~/apis/user.api'
import ConfirmDelete from '~/components/ConfirmDelete'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyTableHead from '~/components/TableHead/TableHead'
import { configTableUser } from '~/constants/config'
import { queryClient } from '~/main'

export default function ManageUserList() {
    const [open, setOpen] = useState<boolean>(false)
    const userId = useRef<string>('')
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => userApi.getAll(),
        placeholderData: keepPreviousData
    })

    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => userApi.delete(id)
    })

    const handleDeleteUser = (id: string) => {
        setOpen(true)
        userId.current = id
    }

    const handleConfirmDelete = () => {
        deleteUserMutation.mutate(userId.current, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['users']
                })
                setOpen(false)
            }
        })
    }

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <ConfirmDelete open={open} setOpen={setOpen} onConfirm={handleConfirmDelete} />
            <HeadManage>Manage User</HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <TableContainer>
                    <Table>
                        <MyTableHead data={configTableUser} />
                        <TableBody>
                            {users &&
                                users.data.result.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell align='left'>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell align='left'>{index + 1}</TableCell>
                                        <TableCell align='left'>{user.fullname}</TableCell>
                                        <TableCell align='left'>{user.email}</TableCell>
                                        <TableCell align='left'>
                                            <Box sx={{ display: 'flex', gap: '5px' }}>
                                                <Link to={`/admin/users/update/${user.id}`}>
                                                    <MyButton type='button' variant='outlined' color='success'>
                                                        Edit
                                                    </MyButton>
                                                </Link>
                                                <MyButton
                                                    onClick={() => handleDeleteUser(user.id)}
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
