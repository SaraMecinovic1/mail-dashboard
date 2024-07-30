import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";

const CardInputs = () => {
  const [arrayOfInfo, setArrayOfInfo] = useState([]);

  const [info, setInfo] = useState({
    email: "",
    code: "",
  });

  const handleEmailChange = (event) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      email: event.target.value,
    }));
  };

  const handleCodeChange = (event) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      code: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (info.email.trim() && info.code.trim()) {
      setArrayOfInfo((prevArray) => [...prevArray, info]);
      setInfo({
        email: "",
        code: "",
      });
    }
  };

  useEffect(() => {
    console.log(arrayOfInfo); // Ovaj useEffect se pokreće svaki put kada se arrayOfInfo ažurira
  }, [arrayOfInfo]);

  return (
    <div className="w-80 h-[280px] border rounded-md border-slate-400 flex items-center justify-center mt-8">
      <div className="flex flex-col items-center">
        <FormControl>
          <FormLabel
            sx={{
              color: "#595656",
            }}
          >
            Email:
          </FormLabel>
          <Input
            sx={{
              width: "270px",
              height: "45px",
              marginBottom: "20px",
            }}
            value={info.email}
            type="email"
            onChange={handleEmailChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel
            sx={{
              color: "#595656",
            }}
          >
            Referal code:
          </FormLabel>
          <Input
            sx={{
              width: "270px",
              height: "45px",
              marginBottom: "10px",
            }}
            value={info.code}
            onChange={handleCodeChange}
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
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default CardInputs;
