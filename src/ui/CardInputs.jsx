import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import CircularProgress from "@mui/joy/CircularProgress";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import services from "../services"; // Dodaj ovaj import

const CardInputs = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidCode = (code) => {
    const codePattern = /^\d{4}$/;
    return codePattern.test(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      toast.error("Please enter valid information!");
      return;
    }

    if (!isValidCode(code)) {
      setCode("");
      toast.error("Referral code must be a valid 4 digit number!");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    setIsLoading(true);

    try {
      // Da li vec email postoji:
      const emailExists = await services.isEmailAlreadyExists(email);

      if (emailExists) {
        setIsLoading(false);
        toast.error("Email already exists!");
        setEmail("");
        return;
      }
      // Ako ne postoji posalji:
      await services.sendNewData(email, code);
    } catch (error) {
      toast.error(error.message);
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
              Referral code:{" "}
              <span className="font-thin text-[12px] ">must have 4 digits</span>
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
              color: "white",
              width: "200px",
              marginTop: "20px",
              backgroundColor: "#a360fc",
              "&:hover": {
                backgroundColor: "#9045f5",
                color: "white",
              },
            }}
            type="submit"
          >
            Send
          </Button>
        </form>
      )}
    </div>
  );
};

export default CardInputs;
