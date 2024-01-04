import { useState, useContext, createContext } from "react";
import { getUsers } from "../services/AuthService";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [listUsers, setListUser] = useState([]);

  // TODO: check for expiry when initing user
  const initUser = async (data) => {
    const expiryInSeconds = data?.auth?.expiryInSeconds || 7200;
    if (!data.auth) data.auth = {};

    setUser(data.user);

    console.log(data, "zzzz", user);
    runLogoutTimer(expiryInSeconds * 1000);
    data.auth.expiryDate = new Date().getTime() + expiryInSeconds * 1000;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...data,
      })
    );
    fetchUsers();
    console.log(listUsers, "ooop");
  };

  const logout = () => {
    setUser(null);
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
      console.log(users, "nnn");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, initUser, logout, fetchUsers, listUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
