import { Box } from '@mui/material'
import { debounce } from 'lodash'
import 'quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'

interface EditorProps {
    onContentChange: (content: string) => void
    initialContent?: string
}

// TODO: Handle the photo upload function to editor in the following project
export default function MyEditor({ onContentChange, initialContent }: EditorProps) {
    const [, setEditorContent] = useState<string>('')
    const [isInitialContentSet, setIsInitialContentSet] = useState<boolean>(false)
    const { quill, quillRef } = useQuill({})

    const debouncedChange = debounce((value: string) => {
        onContentChange(value)
    }, 500)

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const htmlContent = quill.root.innerHTML
                setEditorContent(htmlContent)
                debouncedChange(htmlContent)
            })

            // Set the initial content when the Quill editor is ready
            if (initialContent && !isInitialContentSet) {
                quill.clipboard.dangerouslyPasteHTML(initialContent)
                setIsInitialContentSet(true)
            }
        }
    }, [quill, initialContent, debouncedChange, isInitialContentSet])

    return (
        <Box>
            <Box sx={{ height: '200px' }} ref={quillRef} />
        </Box>
    )
}
