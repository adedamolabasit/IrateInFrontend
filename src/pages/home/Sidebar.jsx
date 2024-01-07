import { Link, useLocation } from "react-router-dom";
import home from "../../assets/auth/home.svg";
import message from "../../assets/home/message.svg";
import { useAuth } from "../../contexts/authContext";

function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  return (
    <div className="bg-[#0B468C] h-screen text-white w-[15.83vw] flex flex-col py-[3.7vh] px-[1.25vw] justify-between ">
      <div>
        <Link to="/" className="mb-[4.26vh] flex items-end gap-2 self-center ">
          <img src={home} alt="" className="w-[2.5rem] " />
          <h1 className="">Home</h1>
        </Link>
        <Link
          to={"/chat"}
          className={`w-full ${
            location.pathname === "/chat" ? "bg-white/10" : ""
          } flex items-center gap-3 px-[0.83vw] py-[0.74vh] rounded-[0.25rem] `}
        >
          <img src={message} alt="" />
          <h3>Message</h3>
        </Link>
      </div>
      <button onClick={logout} className="bg-white text-[#F00] flex items-center justify-center gap-2 rounded-[0.25rem] h-[6.44vh] ">
        <img src={logout} alt="" />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
