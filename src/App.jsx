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

    // Proverava da li je currentTime manji od expirationTime + 3600. Ako jeste,sesija je još uvek aktivna i važeća.
    return expirationTime && currentTime < expirationTime + 3600;
  };

  useEffect(() => {
    console.log(isAuthenticated);

    // Funkcija za proveru trenutne sesije
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession(); // Dobija trenutnu sesiju iz Supabase
      if (sessionData?.session) {
        setIsAuthenticated(isSessionValid(sessionData.session)); //Proverava da li je dobijena sesija validna na osnovu rezultata funkcije isSessionValid.

        console.log(isAuthenticated);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkSession();

    // Postavlja listener za promene u stanju autentifikacije:
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(isSessionValid(session)); // Ažurira stanje autentifikacije na osnovu nove sesije
      }
    );

    // Čisti listener prilikom demontaže komponente
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
