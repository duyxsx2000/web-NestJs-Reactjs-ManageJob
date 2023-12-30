import React from 'react'
import '../styles/postJob.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
type Props = {
  value: string,
  onChange: (value: string) => void
}
export default function EditorBox({
  value,
  onChange
}: Props) {
  
  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [ { list: 'bullet' }, {'indent': '-1'}, {'indent': '+1'},{'indent': '+2'}],
          ['link', 'image'],
          [{color: ['black','red','blue','green','yellow']}],   
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet','indent',
        'link', 'image', 'color', 
      ]}
      style={{minHeight:'100px', }}
      className='text-2xl h-[70%]'               
    /> 
  )
}
