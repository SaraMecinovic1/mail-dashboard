import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DataPage from "./components/DataPage";
import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data?.session) {
        const currentTime = Math.floor(Date.now() / 1000); // Trenutno vreme u sekundama
        const expirationTime = session.data.session.expires_at;

        if (expirationTime && currentTime < expirationTime + 3600) {
          setIsAuthenticated(true);
          console.log("Session active for another hour");
        } else {
          setIsAuthenticated(false);
          console.log("Session expired");
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          const currentTime = Math.floor(Date.now() / 1000);
          const expirationTime = session.expires_at;

          if (expirationTime && currentTime < expirationTime + 3600) {
            setIsAuthenticated(true);
            console.log("Session active for another hour");
          } else {
            setIsAuthenticated(false);
            console.log("Session expired");
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/data"
          element={isAuthenticated ? <DataPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
