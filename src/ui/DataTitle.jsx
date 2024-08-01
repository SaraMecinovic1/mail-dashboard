import RecentActorsIcon from "@mui/icons-material/RecentActors";
import LoginButton from "../ui/LoginButton";

const DataTitle = () => {
  return (
    <div className="w-[100%] h-[80px] bg-[#e6d38a] flex items-center justify-between">
      <div className="w-[80px] h-[100%] flex items-center justify-start">
        <LoginButton className="h-[30px]" />
      </div>
      <div className="flex-grow flex justify-center">
        <h1 className="font-sans text-3xl font-semibold text-center text-[#595656] tracking-widest flex items-center">
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
