import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DataPage from "./components/DataPage";
import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Pomoćna funkcija za proveru isteka sesije
  const isSessionValid = (session) => {
    const currentTime = Math.floor(Date.now() / 1000); // Trenutno vreme u sekundama
    const expirationTime = session?.expires_at; // Vremenski pečat kada sesija ističe

    return expirationTime && currentTime < expirationTime + 3600; // Ovo predstavlja vreme kada sesija treba da istekne ili bude nevažeća.
  };

  useEffect(() => {
    console.log(isAuthenticated);
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession(); // Dobij trenutnu sesiju
      if (sessionData?.session) {
        setIsAuthenticated(isSessionValid(sessionData.session));

        console.log(isAuthenticated);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(isSessionValid(session));
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
      console.log(isAuthenticated);
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
