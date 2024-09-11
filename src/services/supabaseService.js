import supabase from "../config/supabaseClient";

const login = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error;
};

const logOut = async (setIsAuthenticated, navigate) => {
  await supabase.auth.signOut();
  setIsAuthenticated(false);
  navigate("/login");
};

export default {
  login: login,
  logOut: logOut,
};
