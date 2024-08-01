import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const DataTitle = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] h-[80px] bg-[#e6d38a] flex items-center justify-between">
      <div className="w-[80px] h-[100%] flex items-center justify-start">
        <Button
          onClick={() => navigate("/login")}
          sx={{
            width: "160px",
            height: "50px",
            color: "white",
            fontSize: "17px",
            alignItems: "center",

            "&:hover": {
              backgroundColor: "#d6bd69",
            },
          }}
          variant="plain"
        >
          <LoginIcon fontSize="small" sx={{ marginRight: "5px" }} />
          Login
        </Button>
      </div>
      <div className="flex-grow flex justify-center">
        <h1
          onClick={() => navigate("/")}
          className="font-sans text-3xl font-semibold text-center text-[white] tracking-widest flex items-center"
        >
          <RecentActorsIcon
            sx={{
              paddingRight: "10px",
              fontSize: "43px",
            }}
          />
          DATA
        </h1>
      </div>
      <div className="w-[80px] h-[100%] flex items-center justify-end"></div>
    </div>
  );
};

export default DataTitle;
