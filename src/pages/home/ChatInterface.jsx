import { useEffect, useState } from "react";
import chatuser from "../../assets/home/chatuser.svg";
import send from "../../assets/home/send.svg";
import apartment from "../../assets/home/apartment.svg";
import Chatbox from "./Chatbox";
import { useApp } from "../../contexts/AppContext";
import { getSingleUser } from "../../services/AuthService";
import { STATE } from "../../utils";

function ChatInterface() {
  const { chatText, setChatText, userDetails } = useApp();
  const [chatUser, setChatUser] = useState({});
  const [status, setStatus] = useState(STATE.IDLE);
  const [token, setToken] = useState();
  const [socket, setSocket] = useState(null);
  const [inBox, setInBox] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(STATE.LOADING);
        const response = await getSingleUser(userDetails);
        console.log(response, "mmmm");
        setStatus(STATE.SUCCESS);
        setChatUser(response.data);
      } catch (error) {
        setStatus(STATE.ERROR);
        console.error("Error fetching user:", error);
      }
    };
    if (userDetails) {
      fetchData();
    }
    const user = localStorage.getItem("user");
    const { token } = JSON.parse(user);
    setToken(token);
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && token) {
      const newSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/${userDetails}?token=${token}`
      );

      // Set the socket in state
      setSocket(newSocket);

      // WebSocket Event Listeners
      newSocket.onopen = () => {
        console.log("WebSocket connection opened.");
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data.message);
        setInBox(data.message);
      };

      newSocket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    }
  }, [userDetails, token]);

  const sendText = (text) => {
    if (socket && chatText.trim() !== "") {
      // Send the current message
      const message = { message: text };
      socket.send(JSON.stringify(message));

      // Optionally, update the state to clear the input after sending
      setChatText("");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="py-[1.76vh] pl-[2rem] flex  border-b border-b-[#F2F2F2] gap-[0.94rem] ">
        <img src={chatuser} alt="" className="w-[2.25rem] " />
        <div className="flex flex-col">
          <h2 className="text-[#4F4F4F] ">{chatUser.first_name}</h2>
          <small className="text-[0.625rem] text-[#008000]  ">Online</small>
        </div>
      </div>
      <main className="pt-[3.70vh] pb-[2.78vh] pl-[1.67vw] pr-[1.82vw] h-full flex flex-col justify-between ">
        <div className=" h-full overflow-auto flex flex-col">
          <p className="text-center text-xs font-medium text-[#828282] mb-[0.83vh] ">
            Nov 23, 2023
          </p>
          <div className="mb-[4.91vh] ">
            <img src={apartment} alt="" className="mb-[1.76vh]" />
            <p className="font-bold text-[#4F4F4F]">2 Bedroom Duplex</p>
          </div>
          <Chatbox receive={true} send={false} inBox={inBox} />
          <Chatbox send={true} receive={false} />
        </div>

        <div className="w-full h-[5.93vh] bg-[#F8F8F8] rounded-[0.5rem] px-[0.833vw] flex items-center justify-between gap-4 mt-3 ">
          <input
            type="text"
            name="chat"
            id="chat"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            className="w-full bg-inherit  outline-none text-sm"
            placeholder="Write your message"
          />
          <button type="button" onClick={() => sendText(chatText)}>
            <img src={send} alt="" className="w-[1.5rem] " />
          </button>
        </div>
      </main>
    </div>
  );
}

export default ChatInterface;
