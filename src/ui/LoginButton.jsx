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
        color: "white",
        fontSize: "17px",
        alignItems: "center",
        marginBottom: "20px",
        paddingRight: "25px",
        backgroundColor: "#a360fc",
        "&:hover": {
          backgroundColor: "#9045f5",
          color: "white",
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
