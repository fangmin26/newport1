import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubject, postingAdd, subjectAdd } from '../../../features/admin/otherSlice';
import PhotoCard from './common/PhotoCard';

const ClickAndPut = () => {
    const dispatch = useDispatch();
    const {subjectList}= useSelector((state)=>state.other)
    const [files, setFiles] = useState([]);
    const [loadedImage, setLoadedImage] = useState([]);
    const [subadd,setSubAdd] = useState('');
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState(null);
    const [subjectArr, setSubjectArr] = useState([])
    const onAddThumbnail = (e) => {
        let fileUrls = [];
        let cameraArr = [];
        let alertnum = 0;
          for (let i = 0; i < e.target.files.length; i++) {
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[i])
          const includesLastModified = files.filter((el)=>(el.lastModified === e.target.files[i].lastModified && el.name === e.target.files[i].name))
          //같은 파일 제외하고 배열 저장
          if(includesLastModified.length===0){
              cameraArr.push(e.target.files[i])
              setFiles(files.concat(cameraArr))
              reader.onload = () => {
                fileUrls[i] = reader.result
                setLoadedImage(loadedImage.concat(fileUrls))
                e.target.value = ""
              }
        }
      }
    }
    const onDeleteValue = (el,idx)=>{
      const filterLoaded = loadedImage.filter((img)=>img!==el)
      setLoadedImage(filterLoaded)
      const filterFiles = files.filter((img)=>img!==files[idx])
      setFiles(filterFiles)
    }


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
    
      const onChangeSubjectAdd = (e) =>{
        setSubAdd(e.target.value)
 
      }

      const onClickAddSubject = async() =>{
        const param = {type: subadd}
        const res = await dispatch(subjectAdd(param)).unwrap()
        try {
            if(res.data.ok){
                alert("data ok")
                setSubAdd('')
                thisGetAllSubject()
            }else{
                alert("data no")
            }
        } catch (error) {
            console.log(error)
        }
      }

      const onChangeTitle = (e) =>{
        setTitle(e.target.value)
      }

      const onClickChekcbox = (e)=>{
        const labelName = e.target.parentNode.lastChild.innerText
        console.log(labelName)
        if(e.target.checked){
            subjectArr.push(labelName)
        }
        else{
            const filterArr = subjectArr?.filter((el)=>el!==labelName)
            setSubjectArr(filterArr)
        }
      }

      const onSubmitPosting = async() =>{
        console.log(subjectArr, contents,title)
        const param = {
            title:title,
            content:contents,
            subjectnames:subjectArr
        }
       const res =  await dispatch(postingAdd(param)).unwrap()
       try {
        if(res.data.ok){
            alert("data ok")
            setTitle('')
            setSubjectArr([])
            setContents(null)
            const allCHeckbox = document.querySelectorAll('.checkbox')
            for(let i =0; allCHeckbox?.length>0; i++){
                allCHeckbox[i].checked = false;
            }
        }else{
            alert("data no")
        }
       } catch (error) {
        console.log(error)
       }
        }
    const thisGetAllSubject = useCallback(()=>{
        dispatch(getAllSubject())
    },[dispatch,getAllSubject])
    const text = document.getElementById("subjectadd")
  
    useEffect(()=>{
     thisGetAllSubject();
     const textinput = text.querySelector("input")
     console.log(textinput)
     console.log(textinput.setSelectionRange())

    },[text])
    const onClickDragTxt = () =>{
      // const text = document.getElementById("subjectadd")
      // const textinput = text.querySelector("input")
      // console.log(textinput)
      // console.log(textinput.setSelectionRange())
    }
  return (
    <div className="z-10 absolute top-0 right-0 w-[800px] h-full bg-white p-6 shadow-lg">
    <div className="flex flex-col gap-y-4">
      <div
      onClick={onClickDragTxt}
      >클릭시 어떤 그씨 드래그</div>
      <div className="flex gap-x-4 items-center" id="subjectadd">
          <label className="w-[100px]">subject 추가</label>
          <input className="border w-full p-2 outline-none"
          value={subadd} onChange={onChangeSubjectAdd}
          />
          <span className="bg-gray-200 p-2 w-[100px] text-center"
          onClick={onClickAddSubject}
          >추가</span>
      </div>
      <div className="flex gap-x-4 items-center">
        <label className="w-[100px]">subject</label>
        <ul className='flex gap-x-4'>
            {subjectList?.map((el)=>(
                <li key={el.type} className="flex gap-x-2">
                    <input type="checkbox"
                    className='checkbox'
                    onClick={onClickChekcbox}
                    />
                    <span>{el.type}</span>
                </li>
            ))}
        </ul>
      </div>
      <div className="flex gap-x-4 items-center">
      <label className="w-[100px]">title</label>
        <input className="border w-full p-2 outline-none"
        value={title}
        onChange={onChangeTitle}
        />
      </div>
      <div className="flex gap-x-4 items-center">
       <label className="w-[100px]">content</label>
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
      </div>
      <div className="pt-[30px] flex flex-wrap gap-ㅇ-4 items-center">
       <label className="w-[100px]">content</label>
       <PhotoCard onAddThumbnail={onAddThumbnail} />
       {loadedImage.map((el,idx)=>(
          <li key={idx} className="w-[200px] relative">
            <span 
            onClick={()=>onDeleteValue(el,idx)} 
             className="absolute right-3 top-3 bg-gray-100">닫기</span>
            <img src={el} className="w-full h-auto"/>
          </li>
        ))}
      </div>
      <div>여기에 npm으로 만든 text editor을 넣기, 만든 에디터는 댓글작성시 넣을수 있게 하기</div>
      <div className="bg-gray-100 roudned p-2 text-center"
        onClick={onSubmitPosting}
      >submit</div>
    </div>
  </div>
  )
}

export default ClickAndPut