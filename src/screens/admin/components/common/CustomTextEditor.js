import React, { useState } from 'react'

const CustomTextEditor = () => {
    const [fontColor, setFontColor] = useState("#1d1d1d");
    const [openCode, setOpenCode] = useState(false)
    const options = [
        {valueN:"", innerTxt:"-"},{valuN:"1",innerTxt:"0.63em"},{valuN:"2",innerTxt:"0.82em"},{valuN:"3",innerTxt:"1.0em"},{valuN:"4",innerTxt:"1.13em"},
        {valuN:"5",innerTxt:"1.5em"},{valuN:"6",innerTxt:"2.0em"},
    ]
    const buttons = [
        {classN:"font-bold",val:"BOLD",type:'bold'},
        {classN:"italic",val:"ITALIC",type:'Italic'},
        {classN:"underline",val:"UNDERBAR",type:'Underline'},
        {classN:"line-through",val:"BAR",type:'StrikeThrough'},
        {classN:"",val:"alignL",type:'justifyLeft'},
        {classN:"",val:"alignC",type:'justifyCenter'},   
        {classN:"",val:"alignR",type:'justifyright'},   
    ]
    const onChangeFontColor = (e)=>{
        setFontColor(e.target.value)
        document.execCommand('foreColor',false, e.target.value)
    }
    const onChangeFontSize = (e) =>{
        document.execCommand('fontSize',false, e.target.value)
    }
    return (
        <>
            <div className='w-full flex flex-col gap-y-4'>
                <div className="buttons flex gap-x-2">
                    <div>
                        <label>color</label>
                        <input type="color" name="base" className="w-[20px] h-[20px]"value={fontColor} onChange={onChangeFontColor}/>
                    </div>
                    <div>
                        <label>fontsize</label>
                        <select id="fontsize"
                        className='border'
                        onChange={onChangeFontSize}>
                            {options?.map((el,idx)=>(
                                <option key={idx}value={el.valuN}>{el.innerTxt}</option>
                            ))}
                        </select>
                    </div>
                    {buttons?.map((el,idx)=>(
                        <input 
                        key={idx}
                        type="button" className={"bg-gray-100 "+el.classN} value={el.val} onClick={()=>document.execCommand(el.type)} />
                    ))}
                </div>
                <div>
                    <label>codesample</label>
                    <span className='bg-gray-100 p-2'
                    onClick={()=>setOpenCode(true)}
                    >click</span>
                </div>
                <div>
                    <div className="border outline-none p-2 min-h-[300px]" id="editorDIV" contentEditable="true"
                    suppressContentEditableWarning
                    >
                    </div>
                </div>
            </div>
            {openCode&&
            <div
            className='absolute top-12 left-12 right-12 bottom-12 bg-green-500 p-6'
            >
                <div className='flex justify-end'>
                    <div className="font-bold active:text-red-500 cursor-pointer"
                    onClick={()=>{setOpenCode(false)}}
                    >닫기</div>    
                </div>
                <div id="code" contentEditable="true" className='w-full border p-2 mt-12 bg-black text-white outline-none h-[360px]'/>
                <div className='bg-gray-100 p-6 text-center font-bold'
                onClick={()=>{
                    const textHtml = document.getElementById("code")
                    textHtml.removeAttribute('id')
                    // textHtml.contentEditable="false"
                    textHtml.className = 'w-full p-2 mt-2 bg-black text-white min-height-[100px]'
                    const myEditor = document.getElementById("editorDIV")
                    myEditor.append(textHtml)
                    setOpenCode(false)
                }}
                >입력완료</div>
            </div>}
        </>


  )
}

export default CustomTextEditor