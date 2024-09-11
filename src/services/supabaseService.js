import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";

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

const deleteFunction = async (id) => {
  const { error } = await supabase.from("emails").delete().eq("id", id);
  if (error) {
    console.log("error from delete function:", error);
  }
};

const sendNewData = async (email, code) => {
  const { error } = await supabase
    .from("emails")
    .insert([{ email, code: parseInt(code, 10) }]);

  if (error) {
    console.log(error, "-error from await");
    toast.error("Error submitting data!");
    throw new Error("Error submitting data!");
  } else {
    toast.success(`Thanks for having you, ${email} 💌`);
  }
};

export default {
  login: login,
  logOut: logOut,
  fetchData: fetchData,
  deleteFunction: deleteFunction,
  sendNewData: sendNewData,
};
