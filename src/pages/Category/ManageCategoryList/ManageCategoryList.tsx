import { Box, Checkbox, Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import Table from '@mui/material/Table'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import categoryApi from '~/apis/category.api'
import ConfirmDelete from '~/components/ConfirmDelete'
import HeadManage from '~/components/HeadManage'
import MyButton from '~/components/MyButton'
import MyTableHead from '~/components/TableHead/TableHead'
import { configTableCategory } from '~/constants/config'
import { queryClient } from '~/main'

export default function ManageCategoryList() {
    const [open, setOpen] = useState<boolean>(false)
    const categoryId = useRef<string>('')
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getAll(),
        placeholderData: keepPreviousData
    })

    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => categoryApi.delete(id)
    })

    const handleDeleteCategory = (id: string) => {
        setOpen(true)
        categoryId.current = id
    }

    const handleConfirmDelete = () => {
        deleteUserMutation.mutate(categoryId.current, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['categories']
                })
                setOpen(false)
            }
        })
    }

    return (
        <Box sx={{ mb: 2, px: 4, py: 2 }}>
            <ConfirmDelete open={open} setOpen={setOpen} onConfirm={handleConfirmDelete} />
            <HeadManage to='/admin/categories/create' isButton textButton='Create Category'>
                Manage Category
            </HeadManage>
            <Paper elevation={0} sx={{ my: 2 }}>
                <TableContainer>
                    <Table>
                        <MyTableHead data={configTableCategory} />
                        <TableBody>
                            {categories &&
                                categories.data.result.map((category, index) => (
                                    <TableRow key={category.id}>
                                        <TableCell align='left'>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell align='left'>{index + 1}</TableCell>
                                        <TableCell align='left'>{category.name}</TableCell>

                                        <TableCell align='left'>
                                            <Box sx={{ display: 'flex', gap: '5px' }}>
                                                <Link to={`/admin/categories/update/${category.id}`}>
                                                    <MyButton type='button' variant='outlined' color='success'>
                                                        Edit
                                                    </MyButton>
                                                </Link>
                                                <MyButton
                                                    onClick={() => handleDeleteCategory(category.id)}
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
