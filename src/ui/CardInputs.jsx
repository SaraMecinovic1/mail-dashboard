import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import supabase from "../config/supabaseClient";

const CardInputs = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState(null);

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
      setFormError("Referral code must be a valid number!");
      return;
    }
    console.log("Submitting data:", { email, code: codeNumber });

    const { data, error } = await supabase
      .from("emails")
      .insert([{ email, code: codeNumber }]);

    if (error) {
      console.log(error, "-error from await");
      setFormError("Please enter valid information!");
    }

    if (data) {
      console.log("data to await- ", data);
    }
    setFormError(null);
    setEmail("");
    setCode("");
  };

  return (
    <div className="w-80  flex-col h-[285px] border rounded-md border-slate-400 flex items-center justify-center mt-8">
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
            Referal code:
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
      {formError && (
        <p className="error text-red-700 leading-3 text-left mt-4  ">
          {formError}
        </p>
      )}
    </div>
  );
};

export default CardInputs;
