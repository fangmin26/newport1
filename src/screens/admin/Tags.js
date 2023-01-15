import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosting, getAllSubject, statePostingId } from '../../features/admin/otherSlice'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import { useNavigate } from 'react-router-dom'
import { adminSideTitle } from '../../features/admin/commonAdmin'

const Tags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const tags = useSelector((state)=>state.other.subjectList)?.map((el)=>el.type)
  const posts = useSelector((state)=>state.other.postingList)

  const EachList = (el) =>{
    return(
      <>
      <div className='flex gap-x-4'>
        {el?.subjectnames?.length>0 &&
          el.subjectnames?.map((list,idx)=>(
            <span 
            className={"py-2 px-6 text-sm font-semibold rounded inline-block "+
            (idx%2 !==0? "bg-black text-white":"border text-black")}
            key={list}>{list}</span>
          ))
        }
      </div>
      <span className='py-4 font-semibold text-lg block'>{el?.title}</span>
    </>
    )
  }
  const goPostingListId = (el) =>{
    console.log(el)
    navigate("/admin/postingId");dispatch(statePostingId(el.id));
    localStorage.setItem('id',el.id)
  }
  useEffect(()=>{
    dispatch(getAllSubject())
    dispatch(getAllPosting())
    dispatch(adminSideTitle('tags'));
  },[dispatch])

  return (
    <div className='w-full h-screen'>
      <Sidebar/>
      <Navbar/>
      <div className='pt-[120px] pb-[60px] w-5/6 '>
        <ul className='border-b px-6 py-4 flex flex-wrap gap-4'>
          {tags?.map((el, idx)=>(
            <li key={idx}
            // onClick={()=>setGetTagName(el)}
            className={"py-2 px-6 text-sm font-semibold rounded inline-block "+
              (idx%2 !==0? "bg-black text-white":"border text-black")
            }>{el}</li>
          ))}
        </ul>
        <ul className=''>
            {posts?.map((el,idx)=>(
              <li key={idx} className='p-6 border-b hover:bg-gray-100'
              onClick={()=>goPostingListId(el)}
              >
              {EachList(el)}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Tags