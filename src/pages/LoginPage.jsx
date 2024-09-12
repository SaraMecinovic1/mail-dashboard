import { LoginForm } from "../components/LoginForm";
import LoginTitle from "../components/LoginTitle";

const LoginPage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen space-y-6">
      <LoginTitle />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
