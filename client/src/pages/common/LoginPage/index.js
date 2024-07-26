import { ToastContainer } from "react-toastify";
import LoginBanner from "./LoginPageBanner";
import LoginForm from "./LoginForm";
import "./loginForm.css";

const LoginPage = () => {
  return (
    <div className="container-fluid d-flex">
      <LoginBanner />
      <LoginForm />
      <ToastContainer />
    </div>
  );
};

export default LoginPage;