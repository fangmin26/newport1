import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getPostingId } from '../../features/admin/otherSlice'

const PostingId = () => {
    let parser = new DOMParser()
  const thisState = useLocation().state
  const dispatch = useDispatch()
  const {postingIdList} = useSelector((state)=>state.other)
  useEffect(()=>{
    dispatch(getPostingId(thisState))
    const asxs = document.getElementById('asx')
    asxs.innerHTML = parser.parseFromString(postingIdList?.content,'text/html').body.firstChild
  },[dispatch])
  console.log(postingIdList,">?")

//    const doc = parser.parseFromString(string,'text/html').body.firstElementChild
  const extractContent = (list) =>{
    return(
        <>
        {list?.map((el)=>(
            parser.parseFromString(el?.content,'text/html').body.firstElementChild
         ))}
        </>

    )
    // let dv = document.createElement('div')
    // dv.innerHTML = list[0]?.content
    // console.log(dv,"div")
    // return dv
  }
  //const string = postingIdList[0]?.content 


  return (
    <div className='h-screen w-full'>
        <div>{postingIdList[0]?.title}</div>
        <div>{postingIdList[0]?.subjectnames?.map((el)=>el)}</div>
        <div id="asx"></div>
        {/* <div className='whitespace-pre-wrap'>{postingIdList[0]?.content }</div> */}
    </div>
  )
}

export default PostingId