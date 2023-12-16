import React, { useEffect, useRef, useState, useCallback } from 'react'
import ReactDOMServer from 'react-dom/server';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
export default function PostJob() {
  const refTest = useRef<null | HTMLParagraphElement>(null)
  const [content, setconten] = useState('Mô tả chi tiết: ')
  const [title, setTitle] = useState('')

  const handleChange  = (e: any) => {
    setconten(e.target.value)
  }
  const onclickdd = () => {
    console.log(content);  
  }
  return (
    <div className='mt-5'>
      <div className='border-b border-gray-300 text-center'>
        bảng đánh chữ
      </div>
      <div className='flex mt-2'>
        <div className='w-3/5 h-[700px]  flex justify-center items-center'>
          <div  className='w-[90%] h-[90%] border shadow-lg rounded-lg'>
            <form className='p-4'>
              <h1 className='text-center'>FORM POST JOB</h1>
              <input 
                className=' rounded-lg  mt-2 border-gray-300 border outline-none w-full p-2  capitalize font-medium'
                placeholder='Title Job'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="editor mt-3">
                <ReactQuill
                  value={content}
                  onChange={(e)=> handleChange}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      [{color: ['black','red']}],
                      [{ size: ['small', false, 'large', 'huge'] }],
                      ['clean'],
                    ],
                  }}
                  formats={[
                    'header',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet',
                    'link', 'image', 'color', 'size',
                  ]}
                  style={{minHeight:'100px'}}
                  className='text-2xl min-h-[100px] bg-black'               
                />
              </div>

              <div>{content}</div>
            </form>

            <button className='' onClick={onclickdd}>click me</button>
          </div>
       
        </div>  
        <div className='w-1/4 h-[700px]'>

        </div>
      </div>
    </div>
  )
}
