import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import NoChat from "./pages/home/NoChat";
import Inbox from "./pages/home/Inbox";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/authContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Home>
                    <NoChat />
                  </Home>
                }
              />
              <Route
                path="/chat"
                element={
                  <Home>
                    <Inbox />
                  </Home>
                }
              />

              <Route
                path="/login"
                element={
                  <Auth>
                    <Login />
                  </Auth>
                }
              />
              <Route
                path="/signup"
                element={
                  <Auth>
                    <Signup />
                  </Auth>
                }
              />
            </Routes>
          </BrowserRouter>
        </AppProvider>
        <Toaster position="top-right" />
      </AuthProvider>
    </>
  );
}

export default App;
