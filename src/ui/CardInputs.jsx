import FormControl from "@mui/joy/FormControl";
import CircularProgress from "@mui/joy/CircularProgress";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import supabase from "../config/supabaseClient";


const CardInputs = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    // Regularni izraz za osnovnu validaciju email adrese
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      setFormError("Please enter valid information!");
      return;
    }

    if (code.length !== 4) {
      setFormError("Code must have exactly 4 characters!");
      setCode("");
      return;
    }
    const codeNumber = parseInt(code, 10);
    if (isNaN(codeNumber)) {
      setFormError("Referral code must be a valid 4 digit number!");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Invalid email format");
      return;
    }

    setIsLoading(true);

    console.log("Submitting data:", { email, code: codeNumber });

    const { data, error } = await supabase
      .from("emails")
      .insert([{ email, code: codeNumber }]); //insert-slanje podataka

    if (error) {
      console.log(error, "-error from await");
      setFormError("Please enter valid information!");
    }
    if (data) {
      console.log("data to await- ", data);
    }

    setIsLoading(false);
    setFormError(null);
    setEmail("");
    setCode("");
  };

  return (
    <div className="w-80  flex-col h-[285px] border rounded-md border-slate-400 flex items-center justify-center mt-8">
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
      {formError && (
        <p className="error text-red-700 leading-3 text-left mt-4  ">
          {formError}
        </p>
      )}
    </div>
  );
};

export default CardInputs;
