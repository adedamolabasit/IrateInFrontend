import React from "react";
import user from "../../assets/home/user.svg";

function ChatCard({ onClick, firstName, lastName, email }) {
  return (
    <div
      className="h-[10%] flex items-center justify-between w-full cursor-pointer  hover:bg-[#EAF9FE] py-2 px-2 overflow-y-scroll"
      onClick={onClick}
    >
      <img src={user} alt="" className="h-full mr-[0.9375vw] " />
      <div className="text-[#4F4F4F] ">
        <h2 className="text-sm font-medium ">{firstName} {lastName}</h2>
        <p className="text-xs w-[15.38vw] truncate ">
          {email}
          {/* Kindly check out this images, they are very not so much */}
        </p>
      </div>
      {/* <div className="flex flex-col">
        <small>12:03 PM</small>
        <small className="self-end w-[1rem] h-[1rem] flex justify-center items-center rounded-full bg-[#1A75E0] text-white text-[0.625rem] ">
          3
        </small>
      </div> */}
    </div>
  );
}

export default ChatCard;
