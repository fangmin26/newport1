import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {startScroll,} from "../../../../features/admin/commonAdmin";
import { postingSearch } from "../../../../features/admin/otherSlice";
const Navbar = () => {
  const navigate = useNavigate()
  const searchPostingList = useSelector((state)=>state.other.postingList)
  const [inputVal,setInputVal] = useState("");
  const scrollFunc = useSelector((state) => state.commonAdmin.scrollAction);
  const dispatch = useDispatch();
  const onChangeInput = (e) =>{
      setInputVal(e.target.value)
      dispatch(postingSearch({search:e.target.value}))
  }


  const onScroll = () => {
    dispatch(
      startScroll(window.scrollY || window.pageYOffset > 30 ? true : false)
    );
  };

  const onClickNavigateId = () =>{
    console.log()
  }

  const searchList = (el) =>{
   // const string = '1)Typescript를 배우는 이유&nbsp;<div>&nbsp;장점 - 안정적, type 처리 유용 (null, undefined..)&nbsp;</div><div>&nbsp;단점 - 자유도가 없다.</div><div>&nbsp;* 공식문서와 handbook을 꼭 읽고 typescript 버전 별로 읽어보기&nbsp;</div><div><font color="#e34a4a">*참고(제로초님 깃허브)'.replaceAll('&nbsp;'," ")
   const string = el.content 

   let parser = new DOMParser()
    const doc = parser.parseFromString(string,'text/html').body.firstElementChild
  
    console.log(doc)
    

    return(
      <div
      className="w-full flex gap-x-2"
      >
        <div className="w-[120px] flex flex-wrap gap-2 text-center">
          <span>{el.title}</span>
          {el.subjectnames?.map((elem,idx)=>(
            <span key={idx} className="text-sm font-semibold bg-gray-300 text-white p-2 rounded inline">{elem}</span>
          ))}
        </div>
        {/* {doc} */}
          {/* {doc} */}
        {/* <p>{el.content}</p> */}
      </div>
    )
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
     <header
      className={
        scrollFunc
          ? "fixed top-0 right-0 w-full backdrop-blur-md border-b px-12 flex justify-between transition-all duration-300 ease-in-out h-[70px] "
          : "fixed top-0 right-0 w-full backdrop-blur-md border-b px-12 flex justify-between transition-all duration-300 ease-in-out h-[120px]"
      }>
        <div className="flex flex-col justify-center items-center font-semibold border-r pr-12">
          <span className="text-3xl ">XXX_{dayjs().format("YYYY")}</span>
          <span>pei BLOG</span>
          <span className="bg-red-100" onClick={()=>navigate('/admin/postingedit')}>clickandPut</span>
        </div>
        <div
          className="flex justify-end items-center w-2/3 ">
          <input 
          className={"border p-2 h-[48px] outline-none transition-all  duration-300 ease-linear "+(inputVal!==""?" w-full":" w-[200px]")}
          value={inputVal||""}
          placeholder="SEARCH"
          onChange={onChangeInput}
          // onClick={onClickShowAccount}
          />
        </div>
      </header>
      {inputVal!==""&&
      <ul className="absolute top-0 left-0 mt-[120px] bg-white w-full flex justify-end flex-col">  
        {searchPostingList?.map((el)=>(
          <li key={el.id} className="px-12 py-6 border-b flex gap-x-4">
          {searchList(el)}
          </li>
        ))}
      </ul>
      }
    </>

  );
};

export default Navbar;
