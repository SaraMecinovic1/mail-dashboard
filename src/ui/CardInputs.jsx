import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const CardInputs = () => {
  return (
    <div className="w-80 h-[280px] border rounded-md border-slate-400 flex items-center justify-center ">
      <FormControl className="flex flex-col items-center">
        <FormLabel>Email:</FormLabel>
        <Input
          sx={{
            width: "270px",
            height: "45px",
            marginBottom: "20px",
          }}
        />

        <FormLabel>Referal code:</FormLabel>
        <Input
          sx={{
            width: "270px",
            height: "45px",
            marginBottom: "10px",
          }}
        />

        <Button
          sx={{
            width: "200px",
            marginTop: "20px",
            backgroundColor: "#e6d39a",
            "&:hover": {
              backgroundColor: "#d5b886", // tamnija boja za hover
            },
          }}
        >
          Send
        </Button>
      </FormControl>
    </div>
  );
};

export default CardInputs;
