import Title from "../components/Title";
import CardInputs from "../components/CardInputs";
import LoginButton from "../components/LoginButton";

const HomePageUi = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[100vh] space-y-6">
      <LoginButton />
      <Title />
      <CardInputs />
    </div>
  );
};

export default HomePageUi;
