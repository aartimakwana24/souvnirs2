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
//     console.log("filterName", filterName);
//     setSelectedFilter([filterName]);
//     onSelect({ key: heading, values: [filterName] });
//   };

//   return (
//     <div className="filter-card">
//       <h6 className="text-info fw-bold">{heading && `${heading}`}</h6>
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
//             <label htmlFor={`filter-${heading}-${index}`}>
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
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    if (defaultSelection && selectedFilter.length === 0) {
      setSelectedFilter([defaultSelection]);
      onSelect({ key: heading, values: [defaultSelection] });
    }
  }, [defaultSelection, heading, onSelect, selectedFilter]);

  const handleSelectionChange = (filterName) => {
    console.log("filterName", filterName);
    setSelectedFilter([filterName]);
    onSelect({ key: heading, values: [filterName] });
  };

  return (
    <div className="filter-card">
      <h6 className="text-info fw-bold">{heading && `${heading}`}</h6>
      <div className="filter-options">
        {filters.map((filter, index) => (
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
            <label htmlFor={`filter-${heading}-${index}`}>
              {filter.filterName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCardAddToCart;
