import React from "react";
import chat from "../../assets/home/chat.svg";

function EmptyChat() {
  return (
    <div className="flex-col justify-center items-center h-full w-full flex">
      <img src={chat} alt="" />
      <p className="text-[#BDBDBD] ">Click on chat to read conversation</p>
    </div>
  );
}

export default EmptyChat;
