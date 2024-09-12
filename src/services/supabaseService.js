import supabase from "../config/supabaseClient";
import { toast } from "react-toastify";

const login = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("Error from login function:", error);
    return error;
  }
  return null; // Vrati null ako je prijava uspešna
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

const isEmailAlreadyExists = async (email) => {
  const { data: existingEmail, error: checkError } = await supabase
    .from("emails")
    .select()
    .eq("email", email);

  if (checkError) {
    throw new Error("Error checking email!");
  }

  return existingEmail.length > 0;
};

const checkSessionFunc = async () => {
  const { data: sessionData } = await supabase.auth.getSession(); // Dobija trenutnu sesiju iz Supabase
  return sessionData.session; // Vraća sesiju direktno
};

const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session); // kada se dogodi promena stanja, callback funkcija će se pozvati sa novim podacima o sesiji.
  });
};

export default {
  login: login,
  logOut: logOut,
  fetchData: fetchData,
  deleteFunction: deleteFunction,
  sendNewData: sendNewData,
  isEmailAlreadyExists: isEmailAlreadyExists,
  checkSessionFunc: checkSessionFunc,
  onAuthStateChange: onAuthStateChange,
};
