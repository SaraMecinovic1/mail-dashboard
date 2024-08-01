import FormControl from "@mui/joy/FormControl";
import CircularProgress from "@mui/joy/CircularProgress";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardInputs = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      toast.error("Please enter valid information!");
      return;
    }

    if (code.length !== 4) {
      setCode("");
      toast.error("Code must have exactly 4 characters!");
      return;
    }
    const codeNumber = parseInt(code, 10);
    if (isNaN(codeNumber)) {
      toast.error("Referral code must be a valid 4 digit number!");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    setIsLoading(true);

    // Proveri da li email već postoji
    const { data: existingEmail, error: checkError } = await supabase
      .from("emails")
      .select()
      .eq("email", email);

    if (checkError) {
      setIsLoading(false);
      toast.error("Error checking email!");
      console.log(checkError);
      return;
    }

    if (existingEmail.length > 0) {
      setIsLoading(false);
      toast.error("Email already exists!");
      setEmail("");
      return;
    }

    // Ako email ne postoji, nastavi sa slanjem podataka:
    const { error } = await supabase
      .from("emails")
      .insert([{ email, code: codeNumber }]);

    if (error) {
      console.log(error, "-error from await");
      toast.error("Error submitting data!");
    } else {
      toast.success(`Thanks for having you!💌 ${email}`);
    }

    setIsLoading(false);
    setEmail("");
    setCode("");
  };

  return (
    <div className="w-80 flex-col h-[285px] border rounded-md border-slate-400 flex items-center justify-center mt-8">
      <ToastContainer />
      {isLoading ? (
        <CircularProgress color="neutral" variant="solid" />
      ) : (
        <div className="flex flex-col items-center">
          <FormControl>
            <FormLabel
              sx={{
                color: "#595656",
              }}
            >
              Email:
            </FormLabel>
            <Input
              sx={{
                width: "270px",
                height: "45px",
                marginBottom: "20px",
              }}
              value={email}
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              sx={{
                color: "#595656",
              }}
            >
              Referal code:{" "}
              <span className="font-thin text-[12px] ">
                must have 4 characters
              </span>
            </FormLabel>
            <Input
              sx={{
                width: "270px",
                height: "45px",
                marginBottom: "10px",
              }}
              value={code}
              id="code"
              type="text"
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>

          <Button
            sx={{
              color: "#595656",
              width: "200px",
              marginTop: "20px",
              backgroundColor: "#e6d39a",
              "&:hover": {
                backgroundColor: "#d5b886",
              },
            }}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardInputs;
