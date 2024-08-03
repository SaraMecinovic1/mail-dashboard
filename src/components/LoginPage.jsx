import { LoginForm } from "../ui/LoginForm";
import LoginTitle from "../ui/LoginTitle";

const LoginPage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen space-y-6">
      <LoginTitle />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
