import React, { useState } from "react";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

const Contact = () => {
  const [selectName, setSelectName] = useState("contact");
  const onChangeSelectName = (e) => setSelectName(e.target.value);
  return (
    <div className="w-full h-screen">
      <Sidebar />
      <Navbar />
      <div className="pt-[110px] pb-[60px] w-5/6 px-[48px]">
        <div className="pt-[48px]">
        

        </div>
      </div>
    </div>
  );
};

export default Contact;
