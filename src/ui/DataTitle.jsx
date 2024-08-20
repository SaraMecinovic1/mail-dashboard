import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "../App.css";

const DataTitle = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] h-[100px] bg-[#a360fc] flex items-center justify-between">
      <div className="w-[50px] h-[100%] flex items-center justify-center">
        <HomeIcon
          onClick={() => navigate("/")}
          fontSize="large" // Veličina ikone
          sx={{
            color: "#fff", // Boja ikone
            marginLeft: "20px", // Razmak između ikone i sledećeg elementa (ako postoji)
            fontSize: "30px", // Velika veličina ikone
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
      <div className="w-[80px] h-[100%] flex items-center justify-end"></div>
    </div>
  );
};

export default DataTitle;
