import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import CircularProgress from "@mui/joy/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabaseService from "../services/supabaseService";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Sprečava podrazumevano ponašanje forme

    setIsLoading(true);
    if ((email === "" && password === "") || email === "" || password === "") {
      toast.error("Fill in all the fields");
      setEmail("");
      setPassword("");
      setIsLoading(false);
      return;
    }
    try {
      const error = await supabaseService.login(email, password);

      console.log(" login error", error);

      if (error) {
        toast.error("Invalid email or password.");
        setEmail("");
        setPassword("");
      } else {
        toast.success(`Welcome back, ${email} 💌`);
        navigate("/data"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 flex flex-col items-center justify-center h-[285px] border rounded-md border-slate-400 mt-8">
      <ToastContainer />
      {isLoading ? (
        <CircularProgress color="neutral" variant="solid" />
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "260px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#b0b0b0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b0b0b0",
                "&.Mui-focused": {
                  color: "#a360fc", 
                },
              },
            }}
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
          />

          <FormControl sx={{ width: "260px", mt: 2 }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "#b0b0b0",
                "&.Mui-focused": {
                  color: "#a360fc",
                },
              }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#b0b0b0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#a0a0a0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a0a0a0",
                  },
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            type="submit" // Obezbeđuje da dugme podnosi formu
            sx={{
              width: "160px",
              height: "45px",
              color: "white",
              fontSize: "14px",
              alignItems: "center",
              marginTop: "20px",
              paddingRight: "25px",
              backgroundColor: "#a360fc",
              "&:hover": {
                backgroundColor: "#9045f5",
                color: "white",
              },
            }}
            variant="contained"
          >
            <LoginIcon sx={{ marginRight: "5px" }} fontSize="small" />
            Login
          </Button>
        </form>
      )}
    </div>
  );
};
