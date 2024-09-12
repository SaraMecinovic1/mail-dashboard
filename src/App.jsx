import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";
import { useEffect, useState } from "react";
import supabaseService from "./services/supabaseService";
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

      const session = await supabaseService.checkSessionFunc(); // Direktno dobija sesiju

      if (session) {
        const isValid = isSessionValid(session); // Proverava validnost sesije
        setIsAuthenticated(isValid);
        console.log("Da li je sesija validna? ", isValid);
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkSession();

    // Postavlja listener za promene u stanju autentifikacije:
    const { data: authListener } = supabaseService.onAuthStateChange(
      (event, session) => { // ovo je callback func
        const isValid = isSessionValid(session);
        setIsAuthenticated(isValid);
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
