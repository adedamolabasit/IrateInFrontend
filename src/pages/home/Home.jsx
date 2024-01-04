import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import { useAuth } from "../../contexts/authContext";

function Home({ children }) {
  const auth = useAuth();

  useEffect(() => {
    auth.fetchUsers();
  }, []);
  return (
    <div className="w-screen h-screen flex items-start ">
      <Sidebar />
      <div className="w-full h-full flex flex-col">
        <Nav />
        <main className=" h-full w-full">{children}</main>
      </div>
    </div>
  );
}

export default Home;
