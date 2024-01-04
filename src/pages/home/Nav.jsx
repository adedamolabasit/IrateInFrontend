import React from "react";
import search from "../../assets/home/search.svg";
import location from "../../assets/home/location.svg";
import notification from "../../assets/home/notification.svg";
import user from "../../assets/home/user.svg";
import { useAuth } from "../../contexts/authContext";

function Nav() {
  const {user} = useAuth()
  return (
    <nav className="pt-[1.25rem] pb-[0.75rem] pl-[1.5rem] pr-[2.5rem] flex justify-between items-center w-full border-b border-b-[#F2F2F2] ">
      <div className="border border-[#E0E0E0] rounded-[0.5rem] w-[17rem] py-[0.25rem] px-[0.75rem] flex items-center text-[#828282]">
        <img src={search} alt="" className="mr-2" />
        <input
          type="search"
          name=""
          id=""
          className="outline-none w-[6.43rem] mr-[1.06rem]"
        />
        <div className="bg-[#BDBDBD] w-[1px] h-[1.5rem] "></div>
        <small className="ml-[.5rem] mr-3  ">location</small>
        <img src={location} alt="" />
      </div>
      <div className="flex items-center gap-[1.25rem] ">
        <img
          src={notification}
          alt=""
          className="p-[0.5rem]  border border-[#E0E0E0] rounded-2xl "
        />
        <div className="w-[11.25rem] border border-[#E0E0E0] p-[0.5rem] rounded-[0.5rem] flex items-center gap-[1rem] ">
          <img src={user} alt="" />
          <select name="" id="" className="outline-none text-[#4F4F4F]">
            {/* <option value="">{user.first_name} {user.last_name}</option> */}
            <option value="">Jane Doe</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
