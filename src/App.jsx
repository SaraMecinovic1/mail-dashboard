import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DataPage from "./components/DataPage";
import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // prati da li je korisnik autentifikovan.

  useEffect(() => {
    // Funkcija koja će proveriti da li postoji aktivna sesija korisnika.
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data?.session) {
        // Ako session.data postoji, pristupi njegovom svojstvu session
        setIsAuthenticated(true);
        console.log("session");
      } else {
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      // onAuthStateChange()- omogućava praćenje promena u autentifikaciji.
      // Vrednost koja se vraća iz "onAuthStateChange" metode se dodeljuje promenljivoj "authListener".
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
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
