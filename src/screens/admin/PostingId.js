import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllSubject, getPostingId } from '../../features/admin/otherSlice'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar';
import parse from "html-react-parser";
import { adminSideTitle } from '../../features/admin/commonAdmin'

const PostingId = () => {
  const dispatch = useDispatch()
  const tags = useSelector((state)=>state.other.subjectList)?.map((el)=>el.type);
  const {postingIdList} = useSelector((state)=>state.other);
  const postingId = localStorage.getItem('id')
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(postingId)
    dispatch(getPostingId(postingId));
    dispatch(getAllSubject())
    dispatch(adminSideTitle('tags'))
  },[dispatch])

  const EachList = (el) =>{
    let newCont = parse(el.content)
    return(
      <li className='p-6 border-b'
        onClick={()=>navigate("/admin/postingId",{
        state:el.id
      })}
      >
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
      <span className='py-4 font-semibold text-lg block'>{newCont}</span>
    </li>
    )
  }
  console.log(postingIdList)

  return (
    <div className='w-full h-screen'>
      <Sidebar/>
      <Navbar/>
      <div className='pt-[120px] pb-[60px] w-5/6 '>
        <ul className=''>
            {postingIdList?.map((el,idx)=>(
              EachList(el)
            ))}
        </ul>
      </div>
    </div>
  )
}

export default PostingId