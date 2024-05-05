import { Checkbox, TableCell, TableRow, TableHead } from '@mui/material'

interface TableHeadProps {
    data: TableHeadItem[]
}

export interface TableHeadItem {
    id: string
    numeric: boolean
    disablePadding: boolean
    label: string
    width?: string
}
export default function MyTableHead({ data }: TableHeadProps) {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox />
                </TableCell>
                {data.map((item) => (
                    <TableCell
                        width={item.width}
                        key={item.id}
                        align='left'
                        padding={item.disablePadding ? 'none' : 'normal'}
                    >
                        {item.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
