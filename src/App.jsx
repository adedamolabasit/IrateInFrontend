import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Home } from "./pages/home/Home";
import NoChat from "./pages/home/NoChat";
import Inbox from "./pages/home/Inbox";
import { useAuth } from "./contexts/authContext";

export function App() {
  const { userPresence, userToken, userSession, logout, initUser } = useAuth();

  useEffect(() => {
    userPresence();
  }, [userToken, userPresence]);

  const isAuthenticated = !!userToken;

  if (isAuthenticated) {
    let expiryDate = new Date(userSession);
    let todaysDate = new Date();
    if (todaysDate > expiryDate) {
      logout();
    } else {
      const authenticateOpenSession = localStorage.getItem("user");
      initUser(authenticateOpenSession);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
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
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
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
            <Route path="/chat" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
