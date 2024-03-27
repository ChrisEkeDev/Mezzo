import { useEffect, useRef } from 'react'

function useResizeTextArea() {
    const textAreaRef = useRef(null)

    useEffect(() => {
        if (textAreaRef.current) {
            const textarea = textAreaRef.current;
            const resize = () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textAreaRef.scrollHeight}`
            }
            resize();
            textarea.addEventListener('input', resize)
            return () => {
                textarea.removeEventListener('input', resize)
            }
        }
    }, [])

    return { textAreaRef }
}

export default useResizeTextArea
