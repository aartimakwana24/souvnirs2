import Header from "../../../components/ui/Header";
import AttributeBannerImage from "../../../assets/images/attributesImage.png";
import Card from "../../../components/ui/Card";
import { useNavigate, Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import API_WRAPPER from "../../../api";
import { useState } from "react";
import success from "../../../utils";

function AddMenus() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData ", formData);
    const response = await API_WRAPPER.post("/menu/create",formData);
    console.log("respnse ",response);
    if (response.status === 200 && response.data.message == "Exists") {
      navigate(PATHS.adminMenus, {
        state: { titleExists: response.data.titleExists },
      });
    } else if (response.status === 200) {
      success("Success", "Menu created successfully!");
      navigate(PATHS.adminMenus, {
        state: { titleExists: response.data},
      });
      setFormData({});
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Add Menu For"
            subheading="This sections provides ability to add various types of menu headers in the application."
            image={AttributeBannerImage}
          />
          <div>
            <div className="my-5"></div>
            <Card>
              <form onSubmit={handleSubmit} className="d-flex flex-column my-4">
                <div className="form-group w-75 m-3">
                  <label htmlFor="title" className="form-label">
                    <span>Menu For</span>
                  </label>
                  {/* <input
                    onChange={(e) =>
                      setFormData({
                        title: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="add Menu header"
                    type="text"
                    name="title"
                    id="title"
                  /> */}
                  <select
                    onChange={(e) =>
                      setFormData({
                        title: e.target.value,
                      })
                    }
                    className="form-control"
                    name="title"
                    id="title"
                  >
                    <option value="">Select Menu Position</option>
                    <option value="Header">Header</option>
                    <option value="Footer">Footer</option>
                  </select>
                </div>
                <div className="d-flex mt-4 mx-4">
                  <button type="submit" className="btn border me-2">
                    Submit
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMenus;
