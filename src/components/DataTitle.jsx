import PropTypes from "prop-types";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import services from "../services/supabaseService";
import "../App.css";

const DataTitle = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await services.logOut(setIsAuthenticated, navigate);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#a360fc] flex items-center justify-between min-h-[80px] w-full">
      <div className="w-[50px] h-[100%] flex items-center justify-center">
        <HomeIcon
          onClick={() => navigate("/")}
          fontSize="large"
          sx={{
            color: "#fff",
            marginLeft: "20px",
            fontSize: "30px",
          }}
        />
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
      <div className="w-[50px] h-[100%] flex items-center justify-center">
        <LogoutIcon
          onClick={handleLogout}
          fontSize="large"
          sx={{
            color: "#fff",
            marginRight: "20px",
            fontSize: "30px",
          }}
        />
      </div>
    </div>
  );
};

DataTitle.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default DataTitle;
