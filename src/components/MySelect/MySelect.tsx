import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { UseFormRegister } from 'react-hook-form'
import { Role } from '~/@types/role.type'
import { PostStatusOption } from '~/constants/config'

interface MySelectProps {
    value: string // Make sure value is always defined
    name: string
    register?: UseFormRegister<any>
    options: Role[] | PostStatusOption[] | undefined
    label?: string
    customLabel?: string
    onChange: (event: SelectChangeEvent<string>) => void
}

export default function MySelect({ value, options, onChange, label, name, customLabel, register }: MySelectProps) {
    const registerResult = register && name ? register(name) : null
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            {customLabel && <InputLabel sx={{ mb: 0.5 }}>{customLabel}</InputLabel>}

            <FormControl fullWidth>
                {label && <InputLabel>{label}</InputLabel>}
                <Select
                    {...registerResult}
                    label={label && label}
                    labelId='simple-select-label'
                    id='simple-select'
                    value={value || ''} // Ensure value is always defined
                    onChange={handleChange}
                >
                    {options &&
                        options.length > 0 &&
                        options.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                                {option?.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    )
}
