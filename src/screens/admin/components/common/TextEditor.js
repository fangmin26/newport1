import React, { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill';

const TextEditor = ({contents, setContents}) => {
    const QuillRef = useRef();
    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] },
            ],
            ["image", "video"],
          ],
  
        },
      }),
      []
    );
  return (
    <ReactQuill
    ref={(element) => {
       if (element !== null) {
         QuillRef.current = element;
       }
     }}
     className="h-[400px] w-full"
     value={contents}
     onChange={setContents}
     modules={modules}
     theme="snow"
     placeholder="내용을 입력해주세요."
   />

  )
}

export default TextEditor