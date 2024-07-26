import Header from "../../../components/ui/Header";
import AttributeBannerImage from "../../../assets/images/attributesImage.png";
import useAddAttributes from "./useAddAttribute";

function AddAttributes() {
  const { attributeName, handleAddAttribute, setAttributeName } =
    useAddAttributes();
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Add Attributes"
            subheading="This is admin dashboard which addded attributes here provides all the details in a very concise and user-friendly way."
            image={AttributeBannerImage}
          />
          <div>
            <h1 class="h2 mt-4">Add Attributes</h1>
            <form
              onSubmit={(e) => handleAddAttribute(e)}
              class="d-flex flex-column align-items-center justify-content-center mt-4"
            >
              <div class="form-group w-50">
                <label for="attribute" class="form-label">
                  <span>Add Attribute</span>
                </label>
                <input
                  onChange={(e) => setAttributeName(e.target.value)}
                  class="form-control"
                  placeholder="add attributes"
                  type="text"
                  name="attribute"
                  id="attribute"
                />
              </div>
              <button type="submit" class="btn btn-primary mt-4 w-50">
                Add Attribute
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAttributes;
