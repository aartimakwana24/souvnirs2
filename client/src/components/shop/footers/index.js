import NewsLetterBanner from "../../../assets/images/newsLetterBanner.png";
import SouvnirsLogo from "../../../assets/images/souvnirsLogoDarkMode.png";
function Footer() {
  return (
    <>
      <footer className="bg-dark mt-4">
        <div className="container-fluid">
          <img src={NewsLetterBanner} alt="" className="img-fluid" />
        </div>
        <div className="container py-4 py-md-5">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <img src={SouvnirsLogo} alt="Logo" className="" style={{height:"8vh"}}/>
            </div>
            <div className="col-md-8 d-flex justify-content-md-end">
              <ul className="list-unstyled d-flex mb-0 gap-3">
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <span className="visually-hidden">Facebook</span>
                    <svg
                      className="bi bi-facebook"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <span className="visually-hidden">Instagram</span>
                    <svg
                      className="bi bi-instagram"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <span className="visually-hidden">Twitter</span>
                    <svg
                      className="bi bi-twitter"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <span className="visually-hidden">GitHub</span>
                    <svg
                      className="bi bi-github"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.005.071 1.532 1.035 1.532 1.035.891 1.526 2.335 1.089 2.906.832.089-.645.35-1.089.636-1.338-2.22-.253-4.557-1.105-4.557-4.917 0-1.085.387-1.975 1.03-2.67-.104-.253-.447-1.273.097-2.655 0 0 .837-.268 2.743 1.022.797-.222 1.653-.335 2.51-.339.855.004 1.71.115 2.51.339 1.897-1.29 2.743-1.022 2.743-1.022.545 1.382.203 2.402.1 2.655.644.695 1.03 1.585 1.03 2.67 0 3.827-2.343 4.665-4.572 4.912.36.31.679.927.679 1.867 0 1.348-.013 2.434-.013 2.766 0 .27.182.579.688.482C17.135 20.2 20 16.434 20 12.017 20 6.484 15.523 2 12 2z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="text-light mx-5"/>
        <div className="container py-4 py-md-5">
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-0">
              <h6 className="text-light">Company</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h6 className="text-light">Help</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h6 className="text-light">Contact</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light" style={{textDecoration:"none"}}>
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-dark py-3 text-center text-light">
          <p className="mb-0">© 2024 Souvnirs . All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
