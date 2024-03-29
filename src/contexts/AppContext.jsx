import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showChat, setShowChat] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [chatText, setChatText] = useState("");
  const [userDetails, setUserDetails] = useState();

  const onChatClick = (user) => {
    setShowChat(true);
    setUserDetails(user);
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
        userDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => useContext(AppContext);
