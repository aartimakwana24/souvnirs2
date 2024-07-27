import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "../cards/ProductCard";
import "../cards/index.css";

const SkeletonProductCard = () => {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <div className="bg-secondary mb-3" style={{ height: "176px" }}></div>
        <div
          className="bg-light mb-2"
          style={{ height: "16px", width: "50%" }}
        ></div>
        <div
          className="bg-light"
          style={{ height: "16px", width: "25%" }}
        ></div>
      </div>
    </div>
  );
};

const ProductsListWithFilters = ({ heading, filters, products }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0].id);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  function getRandomValues(array) {
    if (array.length <= 5) {
      return array.slice();
    }
    const values = [];
    const usedIndices = new Set();

    while (values.length < 5) {
      const randomIndex = Math.floor(Math.random() * array.length);

      if (!usedIndices.has(randomIndex)) {
        values.push(array[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return values;
  }

  const getAllProducts = () => {
    // Simulate fetching data
    setTimeout(() => {
      setProductsList(getRandomValues(products));
      setLoading(false); 
    }, 1000);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 className="h4">{heading}</h1>
        <div className="btn-group" role="group">
          {filters.map((filter) => (
            <div
              className={`filter-btn1 mx-3 hover-pointer${
                activeFilter === filter.id ? "active" : ""
              }`}
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setLoading(true);
                getAllProducts();
              }}
            >
              {filter.name}
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row g-4">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div className="col-md-4" key={index}>
                <SkeletonProductCard />
              </div>
            ))
          : // Render actual product cards when data is available
            productsList.map(
              ({ _id, name, price, rating, coverImage, slug, result }) => (
                <div className="col-md-4" key={_id}>
                  <ProductCard
                    title={name}
                    price={
                      result && result.length > 0 ? result[0].price : price
                    }
                    rating={rating}
                    id={_id}
                    image={coverImage}
                    slug={slug}
                  />
                </div>
              )
            )}
      </div>
    </div>
  );
};

export default ProductsListWithFilters;
