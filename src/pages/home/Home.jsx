import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Nav } from "./Nav";
import { useAuth } from "../../contexts/authContext";
import PropTypes from 'prop-types';

export function Home({ children }) {
  const auth = useAuth();

  useEffect(() => {
    auth.fetchUsers();
  }, []);
  return (
    <div className="w-screen h-screen flex items-start ">
      <Sidebar />
      <div className="w-full h-[100vh] flex flex-col">
        <Nav />
        <main> {children}</main>
      </div>
    </div>
  );
}
Home.propTypes = {
  children: PropTypes.node.isRequired,
};
