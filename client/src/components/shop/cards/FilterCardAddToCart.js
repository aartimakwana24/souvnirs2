import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const FilterCardAddToCart = ({ title, heading, filters, onSelect }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterToggle = (filterName) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== filterName)
      );
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

useEffect(() => {
  if (selectedFilters.length > 0) {
    onSelect({ key: heading, values: selectedFilters });
  }
}, [selectedFilters]);


  return (
      <div className="">
        <div className="d-flex justify-content-between align-items-center ">
          <h6 className="text-info fw-bold">
            {heading && `${heading}`}
          </h6>
          <p
            className="text-muted text-decoration-underline cursor-pointer"
            onClick={() => {
              setSelectedFilters([]);
            }}
            style={{ cursor: "pointer" }}
          >
            Clear all
          </p>
        </div>

        <div className=" overflow-auto" style={{ maxHeight: "300px" }}>
          {filters.map((filter, index) => (
            <div
              key={nanoid()}
              className="form-check d-flex align-items-center gap-3"
            >
              <input
                id={`checkBoxes${index}`}
                className="form-check-input"
                type="checkbox"
                checked={selectedFilters.includes(filter.filterName)}
                onChange={() => handleFilterToggle(filter.filterName)}
              />
              <label
                className="form-check-label"
                htmlFor={`checkBoxes${index}`}
              >
                {filter.filterName}
              </label>
            </div>
          ))}
        </div>
      </div>
  );
};

export default FilterCardAddToCart;
