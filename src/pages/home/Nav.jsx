import { useEffect, useState, useRef } from "react";
import search from "../../assets/home/search.svg";
import location from "../../assets/home/location.svg";
import notification from "../../assets/home/notification.svg";
import { useAuth } from "../../contexts/authContext";
import { getSingleUser } from "../../services/AuthService";


export function Nav() {
  const [user, setUser] = useState({});
  const {userId} = useAuth()
  const userRef = useRef(null);

  const setUserCredentials = () => {
    try {
      const value = localStorage.getItem("user");
      if (value) {
        const cred = JSON.parse(value);
        const { user } = cred;
        setUser(user);
      } else {
        console.error("User credentials not found in local storage.");
      }
    } catch (error) {
      console.error(
        "Error parsing user credentials from local storage:",
        error
      );
    }
  };

  useEffect(() => {
    setUserCredentials()
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleUser(userId);
        const userData = {
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email
        };
        userRef.current = userData;
        
        setUser({first_name:response.data.first_name,lastName:response.data.last_name});
        console.log(userRef.current,"uuss", response.data)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
  
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
            <option value="">{userRef.current?.firstName} {userRef.current?.lastName}</option>
            <option value="">{userRef.current?.email}</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

