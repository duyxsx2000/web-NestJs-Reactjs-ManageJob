import React, { useRef } from 'react'
import '../../styles/postJob.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
type Props = {
  value: string,
  onChange: (value: string) => void,
  height: string
}
export default function EditorBox({
  value,
  onChange,
  height
}: Props) {
  
  const quillRef = useRef(null);

 


  return (
    <div>
      
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={value}
        onChange={onChange}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ['bold'],
              [{ list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              [{ color: ['black', 'red', 'blue', 'green', 'yellow'] }],
              ['image'],
              [{ 'custom': 'file' }],
            ],

          },
        }}
        formats={[
          'header',
          'bold', 'blockquote',
          'list', 'bullet','indent',
          'image', 'color', 
        ]}
        
        style={{minHeight:height,overflow: 'auto' }}
        className={`text-2xl h-[65%]`}               
      /> 

    </div>

  )
}
