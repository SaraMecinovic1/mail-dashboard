import supabase from "../config/supabaseClient";

const login = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error;
};

export default {
  login: login,
};
