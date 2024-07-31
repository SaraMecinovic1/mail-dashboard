import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";

const CardInputs = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      setFormError("Please enter valid information!");
      return;
    }
    console.log(email, code);
  };

  // const [arrayOfInfo, setArrayOfInfo] = useState([]);
  // const [info, setInfo] = useState({
  //   email: "",
  //   code: "",
  // });

  // useEffect(() => {
  //   // Učitaj podatke iz localStorage kada se komponenta mountuje
  //   const savedInfo = localStorage.getItem("arrayOfInfo");
  //   if (savedInfo) {
  //     setArrayOfInfo(JSON.parse(savedInfo)); //JSON.parse za konvertovanje stringa nazad u JavaScript objekat.
  //   }
  // }, []);

  // const handleEmailChange = (event) => {
  //   setInfo((prevInfo) => ({
  //     ...prevInfo,
  //     email: event.target.value,
  //   }));
  // };

  // const handleCodeChange = (event) => {
  //   setInfo((prevInfo) => ({
  //     ...prevInfo,
  //     code: event.target.value,
  //   }));
  // };

  // const handleSubmit = () => {
  //   if (info.email.trim() && info.code.trim()) {
  //     //trim() metoda uklanja sve prazne karaktere sa početka i kraja stringa.

  //     const updatedArray = [...arrayOfInfo, info];
  //     setArrayOfInfo(updatedArray);

  //     localStorage.setItem("arrayOfInfo", JSON.stringify(updatedArray));

  //     setInfo({
  //       email: "",
  //       code: "",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   console.log(arrayOfInfo); // Ovaj useEffect se pokreće svaki put kada se arrayOfInfo ažurira
  // }, [arrayOfInfo]);

  return (
    <div className="w-80  flex-col h-[285px] border rounded-md border-slate-400 flex items-center justify-center mt-8">
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
            value={email}
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
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
            value={code}
            id="code"
            type="text"
            onChange={(e) => setCode(e.target.value)}
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
      {formError && (
        <p className="error text-red-700 leading-3 text-left mt-4  ">
          {formError}
        </p>
      )}
    </div>
  );
};

export default CardInputs;
