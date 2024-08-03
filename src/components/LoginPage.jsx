import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginTitle from "../ui/LoginTitle";
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
import supabase from "../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Funkcije za prikaz lozinke:
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Prikazivanje obaveštenja o grešci i čišćenje polja
        toast.error("Neispravan email ili lozinka.");
        setEmail(""); // Čišćenje email polja
        setPassword(""); // Čišćenje lozinka polja
      } else {
        toast.success(`Dobrodošli nazad, ${email} 💌`);
        navigate("/data");
      }
    } catch (error) {
      console.error("Greška pri prijavi:", error);
      toast.error("Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen space-y-6">
      <ToastContainer />
      <LoginTitle />
      <div className="w-80 flex flex-col items-center justify-center h-[285px] border rounded-md border-slate-400 mt-8">
        {isLoading ? (
          <CircularProgress color="neutral" variant="solid" />
        ) : (
          <>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "260px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#b0b0b0", // Siva boja ivice
                  },
                  "&:hover fieldset": {
                    borderColor: "#a0a0a0", // Tamnija siva pri pregledu
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a0a0a0", // Tamnija siva kada je fokusirano
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#b0b0b0", // Podrazumevana boja oznake
                  "&.Mui-focused": {
                    color: "#e6d38a", // Žuta boja kada je fokusirano
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
                  color: "#b0b0b0", // Podrazumevana boja oznake
                  "&.Mui-focused": {
                    color: "#e6d38a", // Žuta boja kada je fokusirano
                  },
                }}
              >
                Lozinka
              </InputLabel>
              <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#b0b0b0", // Siva boja ivice
                    },
                    "&:hover fieldset": {
                      borderColor: "#a0a0a0", // Tamnija siva pri pregledu
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#a0a0a0", // Tamnija siva kada je fokusirano
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
                label="Lozinka"
              />
            </FormControl>
            <Button
              onClick={handleLogin}
              sx={{
                width: "160px",
                height: "45px",
                color: "#595656",
                fontSize: "14px",
                alignItems: "center",
                marginTop: "20px",
                paddingRight: "25px",
                backgroundColor: "#e6d38a",
                "&:hover": {
                  backgroundColor: "#d5b886",
                },
              }}
              variant="contained"
            >
              <LoginIcon sx={{ marginRight: "5px" }} fontSize="small" />
              Prijava
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
