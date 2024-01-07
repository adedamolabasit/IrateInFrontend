import { useState, useContext, createContext } from "react";
import { getUsers, getFriends } from "../services/AuthService";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [listUsers, setListUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState();
  const [userSession, setUserSession] = useState();

  const initUser = async (data) => {
    const expiryInSeconds = data?.auth?.expiryInSeconds || 7200;
    if (!data.auth) data.auth = {};

    runLogoutTimer(expiryInSeconds * 1000);
    data.auth.expiryDate = new Date().getTime() + expiryInSeconds * 1000;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...data,
      })
    );
    fetchUsers();
  };

  const userPresence = async () => {
    try {
      const value = localStorage.getItem("user");
      if (value) {
        const cred = JSON.parse(value);
        const { token, user, auth } = cred;
        setUserToken(token);
        setUserId(user.id);
        setUserSession(auth.expiryDate);
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

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("user");
  };

  function runLogoutTimer(time) {
    setTimeout(() => {
      logout();
    }, time);
  }

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setListUser(users.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFriends = async () => {
    try {
      const friends = await getFriends();
      setFriends(friends.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        userToken,
        userSession,
        initUser,
        logout,
        fetchUsers,
        listUsers,
        userPresence,
        friends,
        fetchFriends,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
