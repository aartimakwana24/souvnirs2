import LoginBannerImg from "../../../assets/images/registerBannerImage.jpg";

const RegisterBanner = () => {
  return (
    <div className="me-5 d-none d-lg-flex col-md-6 col-lg-5">
      <img className="img-fluid" src={LoginBannerImg} alt="Register Banner" />
    </div>
  );
};

export default RegisterBanner;
