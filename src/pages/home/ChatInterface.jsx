import { useEffect, useState, useRef } from "react";
import chatuser from "../../assets/home/chatuser.svg";
import send from "../../assets/home/send.svg";
import Chatbox from "./Chatbox";
import { useApp } from "../../contexts/AppContext";
import { getSingleUser, getChatMessages } from "../../services/AuthService";
import { STATE } from "../../utils";
import { useAuth } from "../../contexts/authContext";


export function ChatInterface() {
  const { chatText, setChatText, userDetails } = useApp();
  const [chatUser, setChatUser] = useState({});
  const [status, setStatus] = useState(STATE.IDLE);
  const [socket, setSocket] = useState(null);
  const [counter, setCounter] = useState(0);
  const [inBox, setInBox] = useState([
    {
      message: "",
      initiator: "",
    },
  ]);

  const containerRef = useRef(null);
  const { userToken, userId } = useAuth();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [inBox]);

  const appendMessages = (newMessages) => {
    setInBox((prevMessages) => [...prevMessages, ...newMessages]);
  };

  useEffect(() => {
    if (userDetails) {
      const newSocket = new WebSocket(
        `${process.env.REACT_APP_WEBSOCKET_URL || "ws://127.0.0.1:8000/ws"}/${userDetails}?token=${userToken}`
      );

      newSocket.onopen = () => {
        console.log("WebSocket connection opened.");
        setSocket(newSocket);
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const chat = {
          message: data.message,
          initiator: data.initiator,
        };
        setCounter((prevCounter) => prevCounter + 1);
        appendMessages([chat]);
      };
    }
    if (socket) {
      socket.close();
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(STATE.LOADING);
        const response = await getSingleUser(userDetails);
        setStatus(STATE.SUCCESS);
        setChatUser(response.data);
      } catch (error) {
        setStatus(STATE.ERROR);
        console.error("Error fetching user:", error);
        console.log(status);
      }
    };
    if (userDetails) {
      fetchData();
    }
  }, [counter, userDetails]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messages = await getChatMessages(userDetails);
        const allMessages = messages.data.map((chat) => ({
          message: chat.content,
          initiator: chat.initiator,
        }));
        setInBox(allMessages);
      } catch (err) {
        console.log(err);
      }
    };
    if (userDetails) {
      fetchMessage();
    }
  }, [counter, userDetails]);

  const sendText = (text) => {
    const cookies = localStorage.getItem("user");
    const { user } = JSON.parse(cookies);
    if (socket && chatText.trim() !== "") {
      const message = {
        initiator: user.id,
        message: text,
      };
      socket.send(JSON.stringify(message));
      setChatText("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendText(chatText);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="py-[1.76vh] pl-[2rem] flex  border-b border-b-[#F2F2F2] gap-[0.94rem] ">
        <img src={chatuser} alt="" className="w-[2.25rem] " />
        <div className="flex flex-col">
          <h2 className="text-[#4F4F4F] ">{chatUser?.first_name}</h2>
          <small className="text-[0.625rem] text-[#008000]  ">Online</small>
        </div>
      </div>
      <main className="pt-[3.70vh] pb-[2.78vh] pl-[1.67vw] pr-[1.82vw] h-[80vh] flex flex-col justify-between ">
        <div ref={containerRef} className="overflow-auto flex flex-col">
          <p className="text-center text-xs font-medium text-[#828282] mb-[0.83vh] ">
            Nov 23, 2023
          </p>
          {[...inBox].reverse().map((message, index) => {
            const isInitiator = message.initiator == userId;
            return isInitiator ? (
              <Chatbox
                key={index}
                receive={true}
                send={false}
                inBox={message.message}
              />
            ) : (
              <Chatbox
                key={index}
                receive={false}
                send={true}
                inBox={message.message}
              />
            );
          })}
        </div>

        <div className="w-full h-[5.93vh] bg-[#F8F8F8] rounded-[0.5rem] px-[0.833vw] flex items-center justify-between gap-4 mt-3 ">
          <input
            type="text"
            name="chat"
            id="chat"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            onKeyDown={handleKeyPress}
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
