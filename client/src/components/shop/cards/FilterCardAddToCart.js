// // import React, { useState, useEffect } from "react";

// // function FilterCardAddToCart({
// //   title,
// //   onSelect,
// //   heading,
// //   filters,
// //   defaultSelection,
// //   disabledCOlor,
// // }) {
// //   const [selectedFilter, setSelectedFilter] = useState([]);

// //   useEffect(() => {
// //     if (defaultSelection && selectedFilter.length === 0) {
// //       setSelectedFilter([defaultSelection]);
// //       onSelect({ key: heading, values: [defaultSelection] });
// //     }
// //   }, [defaultSelection, heading, onSelect, selectedFilter]);

// //   const handleSelectionChange = (filterName) => {
// //     setSelectedFilter([filterName]);
// //     onSelect({ key: heading, values: [filterName] });
// //   };

// //   return (
// //     <div className="filter-card">
// //       <h6 className="text-info fw-bold">{heading}</h6>
// //       <div className="filter-options">
// //         {filters.map((filter, index) => (
// //           <div key={index} className="filter-option">
// //             <input
// //               type="radio"
// //               className="form-check-input"
// //               id={`filter-${heading}-${index}`}
// //               name={`filter-${heading}`}
// //               value={filter.filterName}
// //               checked={selectedFilter.includes(filter.filterName)}
// //               onChange={() => handleSelectionChange(filter.filterName)}
// //             />
// //             <label
// //               htmlFor={`filter-${heading}-${index}`}
// //               // className={`${disabledCOlor ? "bg-secondary" : ""}`}
// //             >
// //               {filter.filterName}
// //             </label>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default FilterCardAddToCart;



// import React, { useState, useEffect } from "react";

// function FilterCardAddToCart({
//   title,
//   onSelect,
//   heading,
//   filters,
//   defaultSelection,
// }) {
//   const [selectedFilter, setSelectedFilter] = useState([]);

//   useEffect(() => {
//     if (defaultSelection && selectedFilter.length === 0) {
//       setSelectedFilter([defaultSelection]);
//       onSelect({ key: heading, values: [defaultSelection] });
//     }
//   }, [defaultSelection, heading, onSelect, selectedFilter]);

//   const handleSelectionChange = (filterName) => {
//     setSelectedFilter([filterName]);
//     onSelect({ key: heading, values: [filterName] });
//   };

//   {
//     console.log("filters.disabled ", filters.disabled);
//   }
//   return (
//     <div className="filter-card">
//       <h6 className="text-info fw-bold">{heading}</h6>
//       <div className="filter-options">
//         {filters.map((filter, index) => (
//           <div key={index} className="filter-option">
//             <input
//               type="radio"
//               className="form-check-input"
//               id={`filter-${heading}-${index}`}
//               name={`filter-${heading}`}
//               value={filter.filterName}
//               checked={selectedFilter.includes(filter.filterName)}
//               onChange={() => handleSelectionChange(filter.filterName)}
//             />
//             <label
//               htmlFor={`filter-${heading}-${index}`}
//               className={`filter-label ${
//                 filter.disabled ? "text-secondary" : ""
//               }`}
//             >
//               {filter.filterName}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FilterCardAddToCart;






import React, { useState, useEffect } from "react";

function FilterCardAddToCart({
  title,
  onSelect,
  heading,
  filters,
  defaultSelection,
  selectedAttributes,
  attributes, // Array of attribute names
  attributeValues, // Object mapping attribute names to values
  isOutOfStock,
  handleAttributeChange,
  product,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    if (defaultSelection && selectedFilter.length === 0) {
      setSelectedFilter([defaultSelection]);
      onSelect({ key: heading, values: [defaultSelection] });
    }
  }, [defaultSelection, heading, onSelect, selectedFilter]);

  const handleSelectionChange = (filterName) => {
    setSelectedFilter([filterName]);
    onSelect({ key: heading, values: [filterName] });
  };

  console.log("filters:", filters);
  console.log("attributes:", attributes);
  console.log("attributeValues:", attributeValues);

  return (
    <div className="filter-card">
      <h6 className="text-info fw-bold">{heading}</h6>
      <div className="filter-options">
        {/* {filters.map((filter, index) => (
          <div key={index} className="filter-option">
            <input
              type="radio"
              className="form-check-input"
              id={`filter-${heading}-${index}`}
              name={`filter-${heading}`}
              value={filter.filterName}
              checked={selectedFilter.includes(filter.filterName)}
              onChange={() => handleSelectionChange(filter.filterName)}
            />
            <label
              htmlFor={`filter-${heading}-${index}`}
              className={`filter-label ${
                filter.disabled ? "text-secondary" : ""
              }`}
            >
              {filter.filterName}
            </label>
          </div>
        ))} */}
        {console.log("attributes in filter ", attributes)}
        {Array.isArray(attributes) &&
          attributes.map((attribute) => (
            <div>
              {Array.isArray(attribute) &&
                attributeValues[attribute].map((value) => {
                  const variant = {
                    ...selectedAttributes,
                    [attribute]: value,
                  };
                  const outOfStock = isOutOfStock(variant);

                  return (
                    <label
                      key={value}
                      style={{ opacity: outOfStock ? 0.5 : 1 }}
                    >
                      <input
                        type="radio"
                        name={attribute}
                        value={value}
                        checked={selectedAttributes[attribute] === value}
                        onChange={() => handleAttributeChange(attribute, value)}
                        disabled={outOfStock}
                      />
                      {value} {outOfStock && "(Out of Stock)"}
                    </label>
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FilterCardAddToCart;
