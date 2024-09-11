import supabase from "../config/supabaseClient";

const login = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error;
};

const logOut = async (setIsAuthenticated, navigate) => {
  try {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate("/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const fetchData = async () => {
  const { data, error } = await supabase.from("emails").select();
  if (error) {
    throw new Error("Could not fetch the emails!");
  }
  return data;
};

export default {
  login: login,
  logOut: logOut,
  fetchData: fetchData,
};
