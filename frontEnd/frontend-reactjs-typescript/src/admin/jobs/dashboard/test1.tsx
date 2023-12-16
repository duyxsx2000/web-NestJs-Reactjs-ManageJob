import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles


const BlogEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value: any) => {
    setContent(value);
  };

  const saveToDatabase = () => {
    // Handle saving to the database here
    console.log('Saved to database:', content);
  };

  return (
    <div>
      {/* Thanh công cụ */}
      <div className="toolbar">
        <button onClick={saveToDatabase}>Lưu vào cơ sở dữ liệu</button>
      </div>

      {/* Thanh nhập liệu */}
      <div className="editor">
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['color'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet',
            'link', 'image', 'color',
          ]}
          style={{ minHeight: '200px', border: '1px solid #ccc' }}
          className='space-y-9'
        />
      </div>
    </div>
  );
};

export default BlogEditor;
