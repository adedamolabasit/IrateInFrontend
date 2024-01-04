import { useState, useContext, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showChat, setShowChat] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [chatText, setChatText] = useState("");
  const [userDetails, setUserDetails] = useState({})

  const onChatClick = (user) => {
    setShowChat(true);
    setUserDetails(user)
    console.log(userDetails,"koi")
  };

  return (
    <AppContext.Provider
      value={{
        showChat,
        setShowChat,
        onChatClick,
        showAddUserModal,
        setShowAddUserModal,
        chatText,
        setChatText,
        userDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
