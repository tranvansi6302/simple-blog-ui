import { FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { UseFormRegister } from 'react-hook-form'
import { Category } from '~/@types/category.type'

interface MySelectIdProps {
    value: string // Make sure value is always defined
    name: string
    errors: boolean | any
    register?: UseFormRegister<any>
    options: Category[] | undefined
    label?: string
    customLabel?: string
    onChange: (event: SelectChangeEvent<string>) => void
}

export default function MySelectId({
    value,
    options,
    onChange,
    label,
    name,
    customLabel,
    errors,
    register
}: MySelectIdProps) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            {customLabel && <InputLabel sx={{ mb: 0.5 }}>{customLabel}</InputLabel>}

            <FormControl fullWidth error>
                {label && <InputLabel>{label}</InputLabel>}
                <Select
                    {...registerResult}
                    label={label && label}
                    labelId='simple-select-label-v2'
                    id='simple-select-v2'
                    error={errorResult}
                    value={value || ''} // Ensure value is always defined
                    onChange={handleChange}
                >
                    {options &&
                        options.length > 0 &&
                        options.map((option) => (
                            <MenuItem key={option.name} value={option.id}>
                                {option?.name}
                            </MenuItem>
                        ))}
                </Select>
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </Box>
    )
}
