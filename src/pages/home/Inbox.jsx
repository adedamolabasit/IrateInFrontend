import { useEffect } from "react";
import search from "../../assets/home/search.svg";
import ChatCard from "./ChatCard";
import EmptyChat from "./EmptyChat";
import { ChatInterface } from "./ChatInterface";
import { useApp } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/authContext";

function Inbox() {
  const { showChat, onChatClick } = useApp();
  const { fetchUsers, listUsers, fetchFriends, friends } = useAuth();

  useEffect(() => {
    fetchUsers();
    fetchFriends();
  }, []);

  return (
    <div className="flex">
      <div className="flex h-[90vh] bg-[#F9FAFB] w-[40vw] ">
        <div className="">
          <div className="pt-[2.037vh] pb-[1.67vh] pl-[2.08vw] pr-[1.09vw] border-b-[#F2F2F2] border-b ">
            <h1 className="text-3xl mb-[1.11vh]">Inbox</h1>
            <div className="border border-[#E0E0E0] w-full flex items-center gap-2 bg-white px-[0.625vw] h-[4.44vh] rounded-[0.5rem] ">
              <img src={search} alt="" />
              <input type="search" name="" id="" className="outline-none " />
            </div>
          </div>

          <div className="max-h-[30vh] overflow-y-scroll no-scrollbar py-4">
            <div className="px-10 font-bold text-sm">Friends</div>
            {friends?.length > 0 ? (
              friends.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col items-center gap-[2.8vh] w-full mt-[2.22vh] px-[2.08vw]"
                >
                  <ChatCard
                    onClick={() => onChatClick(user.id)}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                  />
                </div>
              ))
            ) : (
              <div className="px-12 text-sm">No Friends <a href="/" className="text-xs text-green-600">Add Friends</a></div>
            )}
          </div>

          <div className="min-h-[40vh] overflow-y-scroll no-scrollbar py-4">
            <div className="px-10 font-bold text-sm">All Users</div>
            {listUsers?.map((user) => {
              return (
                <div
                  key={user.id}
                  className="cursor-not-allowed flex flex-col items-center gap-[2.8vh] w-full mt-[2.22vh] px-[2.08vw]"
                >
                  <ChatCard
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                    cursor = "cursor-not-allowed"
  
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <main className="w-full h-full overflow-y-scroll  ">
        {showChat ? <ChatInterface /> : <EmptyChat />}
      </main>
    </div>
  );
}

export default Inbox;
