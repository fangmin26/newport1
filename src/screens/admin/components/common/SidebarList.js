import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  adminSideSubTitle,
  adminSideTitle,
} from "../../../../features/admin/commonAdmin";

const SidebarList = ({ el, idx }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titleName = useSelector((state) => state.commonAdmin.sideTitle);
  const subTitleName = useSelector((state) => state.commonAdmin.sideSubtitle);
  const goLink = (param) => {
    console.log(param)
    if (param === "title") {
      navigate(el.titleLink);
      dispatch(adminSideTitle(el.title));
      dispatch(adminSideSubTitle(el.subtitle1));
    } else if (param === "subtit1") {
      navigate(el.subtitle1Link);
      dispatch(adminSideSubTitle(el.subtitle1));
    } else if (param === "subtit2") {
      navigate(el.subtitle2Link);
      dispatch(adminSideSubTitle(el.subtitle2));
    } else if (param === "subtit3") {
      navigate(el.subtitle3Link);
      dispatch(adminSideSubTitle(el.subtitle3));
    } else if (param === "subtit4") {
      navigate(el.subtitle4Link);
      dispatch(adminSideSubTitle(el.subtitle4));
    } else if (param === "subtit5") {
      navigate(el.subtitle5Link);
      dispatch(adminSideSubTitle(el.subtitle5));
    } else {
      navigate(el.subtitle6Link);
      dispatch(adminSideSubTitle(el.subtitle6));
    }
  };

  const subList = (subTitleName, elSubtitle, elSubtitleLink) => {
    return (
      <>
        <div
          className={
            subTitleName === elSubtitle
              ? "text-gray-500 px-2"
              : "hover:text-gray-500 px-2"
          }
          onClick={() => goLink(elSubtitleLink)}
        >
          {elSubtitle}
        </div>
        <span className="w-full h-[1px] bg-white block my-1"></span>
      </>
    );
  };
  return (
    <li
      className={
        titleName === el.title
          ? "border-b px-6 py-4 bg-black text-white"
          : "border-b px-6 py-4"
      }
    >
      <div
        className="flex justify-between py-4 cursor-pointer"
        onClick={() => {goLink("title");console.log(el.title, titleName)}}
      >
        <div className="flex gap-x-4 ">{el.title}</div>
        <img src={process.env.PUBLIC_URL + "/images/arrow_down.svg"} alt="하단" 
        className={titleName === el.title?"transition-all rotate-90  duration-500 ease-linear ":"transition-all rotate-0  duration-500 ease-linear"}
        />
      </div>
      {titleName === el.title && el.subtitle1 !== undefined ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col cursor-pointer">
            {el.subtitle1 !== undefined &&
              subList(subTitleName, el.subtitle1, "subtit1")}
            {el.subtitle2 !== undefined &&
              subList(subTitleName, el.subtitle2, "subtit2")}
            {el.subtitle3 !== undefined &&
              subList(subTitleName, el.subtitle3, "subtit3")}
            {el.subtitle4 !== undefined &&
              subList(subTitleName, el.subtitle4, "subtit4")}
            {el.subtitle5 !== undefined &&
              subList(subTitleName, el.subtitle5, "subtit5")}
            {el.subtitle6 !== undefined &&
              subList(subTitleName, el.subtitle6, "subtit6")}
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </li>
  );
};

export default SidebarList;
