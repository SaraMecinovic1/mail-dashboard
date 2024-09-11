import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DataPage from "./components/DataPage";
import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Pomoćna funkcija za proveru isteka sesije
  const isSessionValid = (session) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = session?.expires_at;
    return expirationTime && currentTime < expirationTime;
  };

  useEffect(() => {
    // Funkcija za proveru trenutne sesije
    const checkSession = async () => {
      setIsLoading(true);
      const { data: sessionData } = await supabase.auth.getSession(); // Dobija trenutnu sesiju iz Supabase
      if (sessionData?.session) {
        const isValid = isSessionValid(sessionData.session);
        setIsAuthenticated(isValid);
        console.log("Da li je sesija validna? ", isValid);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkSession();

    // Postavlja listener za promene u stanju autentifikacije:
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const isValid = isSessionValid(session);
        setIsAuthenticated(isValid); // Ažurira stanje autentifikacije na osnovu nove sesije
        console.log(
          "Promena stanja autentifikacije, da li je validno?",
          isValid
        );
      }
    );

    // Čisti listener prilikom demontaže komponente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/data"
        element={
          isAuthenticated ? (
            <DataPage setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
