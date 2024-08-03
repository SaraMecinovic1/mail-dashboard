import { useState } from "react";
import LoginTitle from "../ui/LoginTitle";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/joy/Button";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[100vh] space-y-6">
      <LoginTitle />
      <div className="w-80 flex-col h-[285px] border rounded-md border-slate-400 flex items-center justify-center mt-8">
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
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
          sx={{
            color: "#595656",
            width: "200px",
            marginTop: "20px",
            backgroundColor: "#e6d39a",
            "&:hover": {
              backgroundColor: "#d5b886",
            },
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
