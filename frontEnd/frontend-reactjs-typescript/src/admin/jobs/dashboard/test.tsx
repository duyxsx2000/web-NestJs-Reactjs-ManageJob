import React, { useRef, useState } from 'react';

export default function Testpage() {
  const refdiv = useRef<null | HTMLParagraphElement>(null);
  const [test, setTest] = useState<string | null>(null);

  const applyList = (command: string) => {
    if (refdiv.current) {
      document.execCommand(command, false, undefined);
      const html = refdiv.current.innerHTML;
      setTest(html);
    }
  };

  return (
    <>
      {test && <div dangerouslySetInnerHTML={{ __html: test }} />}
      <div ref={refdiv} className='container mt-8' contentEditable></div>
      <button onClick={() => applyList('insertOrderedList')}>Danh sách số</button>
      <button onClick={() => applyList('insertUnorderedList')}>Danh sách dấu đầu dòng</button>
    </>
  );
}
