// import { useEffect, useState } from "react";
// import { nanoid } from "nanoid";
// import Card from "../../ui/Card/index.js";

// const FilterCard = ({ title, heading, filters, onSelect }) => {
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

//   useEffect(() => {
//     onSelect({ key: heading, values: selectedFilters });
//   }, [selectedFilters]);

//   return (
//     <Card>
//       <div className="p-4">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h6 className="text-info fw-bold">
//             {heading && `Filter By ${heading}`}
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
//         <div className="mt-4"></div>

//         <div className="mt-4 overflow-auto" style={{ maxHeight: "300px" }}>
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
//     </Card>
//   );
// };

// export default FilterCard;



import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Card from "../../ui/Card/index.js";

const FilterCard = ({
  title,
  heading,
  filters,
  onSelect,
  defaultSelection,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    if (defaultSelection && selectedFilter === "") {
      setSelectedFilter(defaultSelection);
      onSelect({ key: heading, values: [defaultSelection] });
    }
  }, [defaultSelection, heading, onSelect, selectedFilter]);

  const handleSelectionChange = (filterName) => {
    setSelectedFilter(filterName);
    onSelect({ key: heading, values: [filterName] });
  };

  return (
    <Card>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-info fw-bold">
            {heading && `Filter By ${heading}`}
          </h6>
          <p
            className="text-muted text-decoration-underline cursor-pointer"
            onClick={() => setSelectedFilter("")}
            style={{ cursor: "pointer" }}
          >
            Clear all
          </p>
        </div>
        <div className="mt-4"></div>

        <div className="mt-4 overflow-auto" style={{ maxHeight: "300px" }}>
          {filters.map((filter, index) => (
            <div
              key={nanoid()}
              className="form-check d-flex align-items-center gap-3"
            >
              <input
                id={`radioButton${index}`}
                className="form-check-input"
                type="radio"
                checked={selectedFilter === filter.filterName}
                onChange={() => handleSelectionChange(filter.filterName)}
              />
              <label
                className="form-check-label"
                htmlFor={`radioButton${index}`}
              >
                {filter.filterName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default FilterCard;
