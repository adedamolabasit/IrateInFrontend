import chat from "../../assets/home/chat.svg";
import { useApp } from "../../contexts/AppContext";
import AddUser from "./AddUser";
import { ToastContainer } from "react-toastify";

function NoChat() {
  const { showAddUserModal, setShowAddUserModal } = useApp();
  return (
    <div className="flex items-center justify-center h-full flex-col text-[#828282] ">
      <img src={chat} alt="" className="mb-[1rem]" />
      <h1 className="text-2xl">No Chats</h1>
      <p className="mb-[2.19rem] ">
        You have not received or send anyone a message.
      </p>
      <button
        className="bg-[#0B468C] text-white rounded-[0.375rem] w-[10.52vw] h-[5.19vh] text-sm "
        onClick={() => setShowAddUserModal(true)}
      >
        + Add a person
      </button>

      {showAddUserModal && (
        <div
          className="absolute top-0 left-0 bg-black/40 w-screen h-screen z-[0] cursor-pointer"
          onClick={() => setShowAddUserModal(false)}
        >
          <div className="absolute top-0 right-0">
            <ToastContainer />
          </div>
        </div>
      )}
      {showAddUserModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <AddUser setShowAddUserModal={setShowAddUserModal} />
        </div>
      )}
    </div>
  );
}

export default NoChat;
