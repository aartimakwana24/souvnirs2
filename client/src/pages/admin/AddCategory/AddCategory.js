import Header from "../../../components/ui/Header";
import ReusableTable from "../../../components/ui/Tables";
import { Suspense, useMemo, useState } from "react";
import { PATHS } from "../../../Routes/paths";
import { Link } from "react-router-dom";
import watch1 from "../../../assets/images/watch1.png";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import useCategory from "./useCategory";

function AddCategory() {  
    const {
      handleAddAttribute,
      handleAttributeDelete,
      handleInputChange,
      handleSubmit,
      parentCategories,
      searchQuery,
      searchResults,
      selectedAttributes,
      setSearchQuery,
    } = useCategory();

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Add Category"
            subheading="This is admin dashboard which addded attributes here provides all the details in a very concise and user-friendly way."
            // image={AttributeBannerImage}
          />

          <div>
            <h1 className="text-2xl mt-8">Category</h1>
            <form
              onSubmit={handleSubmit}
              className="row g-4 mt-4 bg-light p-3 rounded-xl"
            >
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="name" className="form-label">
                  Category Name
                </label>
                <input
                  placeholder="Category Name"
                  className="form-control"
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="description" className="form-label">
                  Category Description
                </label>
                <input
                  placeholder="Category Description"
                  className="form-control"
                  onChange={handleInputChange}
                  type="text"
                  name="description"
                  id="description"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="hsnCode" className="form-label">
                  HSN Code
                </label>
                <input
                  placeholder="HSN Code"
                  className="form-control"
                  onChange={handleInputChange}
                  type="text"
                  name="hsn_code"
                  id="hsnCode"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="type" className="form-label">
                  Type
                </label>
                <input
                  placeholder="Category Type"
                  className="form-control"
                  onChange={handleInputChange}
                  type="text"
                  name="type"
                  id="type"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="parentCategory" className="form-label">
                  Parent Category
                </label>
                <select
                  className="form-select"
                  onChange={(e) => handleInputChange(e)}
                  name="parentId"
                >
                  <option disabled selected>
                    Select a parent category (optional)
                  </option>
                  {parentCategories.map((parent) => (
                    <option key={parent._id} value={parent._id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="name" className="form-label">
                  Slug
                </label>
                <input
                  placeholder="Category Slug"
                  className="form-control"
                  onChange={handleInputChange}
                  type="text"
                  name="slug"
                  id="slug"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <input
                  placeholder="Search Attributes"
                  className="form-control mb-2"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="overflow-auto mt-4">
                  {searchResults.map((item) => (
                    <p
                      onClick={() => handleAddAttribute(item)}
                      className={`w-100 btn btn-primary mb-4 cursor-pointer rounded text-white font-semibold shadow-sm `}
                      key={nanoid()}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="col col-lg-6 col-md-12 col-12">
                <h1 className="text-2xl">Selected Attributes</h1>
                <div className="mt-2">
                  {selectedAttributes.map((selectedAttribute) => {
                    return (
                      <p
                        className={`bg-white d-flex justify-content-between w-full mb-4 rounded`}
                        key={nanoid()}
                      >
                        <span className="">{selectedAttribute.name}</span>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleAttributeDelete(selectedAttribute)
                          }
                          type="button"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </p>
                    );
                  })}
                </div>
              </div>
                <button className="btn btn-primary w-25 mt-4">
                  Add Category
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
