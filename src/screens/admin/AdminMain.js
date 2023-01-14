import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminSideTitle } from '../../features/admin/commonAdmin'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import Pagination from "pagination-peiss"
import { getAllPosting, postingSearch } from '../../features/admin/otherSlice'
import { useNavigate } from 'react-router-dom'
import parse from "html-react-parser";
const AdminMain = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const searchPostingList = useSelector((state)=>state.other.postingList)
  useEffect(()=>{
    dispatch(adminSideTitle("/"))
    dispatch(postingSearch({search:""}))
  },[dispatch,adminSideTitle,getAllPosting])
  const page = 1;
  const mainList = (el) =>{
    console.log(el,">?")
    let newCont = parse(el.content)
    return( 
      <>
        <div className={'bg-gray-100 h-[250px] ' +el.src} ></div>
        <div className='p-4'>
          <p className='font-bold'>{el.title}</p>
          {/* <p>{el.content}</p> */}
          <p>{newCont}</p>
          <ul className='flex gap-x-2'>
            {el.subjectnames?.map((elem,idx)=>
            <li 
            className='text-xs bg-gray-200 rounded p-1'
            key={idx}>{elem}</li>
            )}
          </ul>
        </div>
      </>
    )
  }
  return (

          <div className='w-full h-screen'>
          <Sidebar/>
          <Navbar/>
          <section className='pt-[120px] pb-[160px] w-5/6'>
            <div className={'text-white border-b  h-[500px] px-12 py-8 flex justify-end items-left flex-col '+
            "bg-[url('../public/images/photos/sampleimage.jpg')]"}
            >
                <h1 className='text-2xl font-semibold'>this is the recent title</h1>
                <h2>this is the subtitle. the first row</h2>
                <h2>this is the subtitle. and the second row </h2>
            </div>
            <ul className=' grid grid-cols-4 gap-4 p-6'>
              {searchPostingList?.map((el,idx)=>
              <li key={idx}
              onClick={()=>navigate("/admin/postingId",{
                state:el.id
              })}
              >{mainList(el)}</li>
              )}
            </ul>
            <div className='flex justify-center'>
              <Pagination
                totalCount={300}
                pagePerList={10}
                activePage={page}
                onClick={(page)=>console.log(page)}
                prevText={"<"}
                nextText={">"}
                prevEndText={"<<"}
                nextEndText={">>"}
              />
            </div>
          </section>
        </div>


  )
}

export default AdminMain