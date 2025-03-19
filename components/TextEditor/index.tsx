'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditMenu from './edit-menu'

const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
    editorProps: {
        attributes: {
            class: "focus:outline-none focus:ring-0 h-[100px]"
        }
    }
  })

  return (
  <div className='border rounded-md p-2'>

    <EditorContent editor={editor} />
    <EditMenu editor={editor} />
  </div> )
}

export default TextEditor
