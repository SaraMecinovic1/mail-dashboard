import Button from "@mui/joy/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/login")}
      sx={{
        width: "160px",
        height: "50px",
        color: "#595656",
        fontSize: "17px",
        alignItems: "center",
        paddingRight: "25px",
        backgroundColor: "#e6d38a",
        "&:hover": {
          backgroundColor: "#d5b886",
        },
      }}
      variant="soft"
    >
      {" "}
      <LoginIcon
        sx={{
          marginRight: "5px",
        }}
        fontSize="small"
      />{" "}
      Login
    </Button>
  );
};

export default LoginButton;
