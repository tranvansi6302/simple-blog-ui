import { useEffect, useState } from 'react'

interface UseDebounceProps {
    value: string | number
    delay?: number
}

export function useDebounce({ value, delay = 200 }: UseDebounceProps) {
    const [debouncedValue, setDebouncedValue] = useState<string | number>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
