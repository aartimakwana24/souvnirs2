// import { useEffect, useState } from "react";
// import { nanoid } from "nanoid";
// const FilterCardAddToCart = ({ title, heading, filters, onSelect }) => {
//   const [selectedFilters, setSelectedFilters] = useState([]);

//   const handleFilterToggle = (filterName) => {
//     if (selectedFilters.includes(filterName)) {
//       setSelectedFilters(
//         selectedFilters.filter((filter) => filter !== filterName)
//       );
//     } else {
//       setSelectedFilters([...selectedFilters, filterName]);
//     }
//   };

// useEffect(() => {
//   if (selectedFilters.length > 0) {
//     onSelect({ key: heading, values: selectedFilters });
//   }
// }, [selectedFilters]);


//   return (
//       <div className="">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h6 className="text-info fw-bold">
//             {heading && `${heading}`}
//           </h6>
//           <p
//             className="text-muted text-decoration-underline cursor-pointer"
//             onClick={() => {
//               setSelectedFilters([]);
//             }}
//             style={{ cursor: "pointer" }}
//           >
//             Clear all
//           </p>
//         </div>

//         <div className=" overflow-auto" style={{ maxHeight: "300px" }}>
//           {filters.map((filter, index) => (
//             <div
//               key={nanoid()}
//               className="form-check d-flex align-items-center gap-3"
//             >
//               <input
//                 id={`checkBoxes${index}`}
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedFilters.includes(filter.filterName)}
//                 onChange={() => handleFilterToggle(filter.filterName)}
//               />
//               <label
//                 className="form-check-label"
//                 htmlFor={`checkBoxes${index}`}
//               >
//                 {filter.filterName}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//   );
// };

// export default FilterCardAddToCart;

// import React, { useState ,useEffect } from "react";

// function FilterCardAddToCart({
//   title,
//   onSelect,
//   heading,
//   filters,
//   defaultSelection,
// }) {
//   const [selectedFilter, setSelectedFilter] = useState([]);

//   useEffect(() => {
//     if (defaultSelection) {
//       setSelectedFilter([defaultSelection]);
//       onSelect({ key: heading, values: [defaultSelection] });
//     }
//   }, [defaultSelection, heading, onSelect]);

//   const handleSelectionChange = (filterName) => {
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

  console.log("defaultSelection ", defaultSelection);
  useEffect(() => {
    if (defaultSelection) {
      setSelectedFilter([defaultSelection]);
      onSelect({ key: heading, values: [defaultSelection] });
    }
  }, [defaultSelection, heading, onSelect]);

  const handleSelectionChange = (filterName) => {
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
