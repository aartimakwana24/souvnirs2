import { ToastContainer } from "react-toastify";
import RegisterBanner from "./RegisterBanner";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div className="container-fluid h-100 d-flex">
      <RegisterBanner />
      <RegisterForm />
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
