import LoginBannerImg from "../../../assets/images/loginBannerImage.jpg";

const LoginBanner = () => {
  return (
    <div className="me-5 d-none d-lg-flex col-md-6 col-lg-5">
      <img className="img-fluid" src={LoginBannerImg} alt="Login Banner" style={{height:"100vh"}}/>
    </div>
  );
};

export default LoginBanner;
