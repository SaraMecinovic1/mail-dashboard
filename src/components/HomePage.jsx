import Title from "../ui/Title";
import CardInputs from "../ui/CardInputs";
import supabase from "../config/supabaseClient";


const HomePage = () => {

  console.log("supabase- ", supabase);
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[100vh] space-y-6">
      <Title />
      <CardInputs />
    </div>
  );
};

export default HomePage;
