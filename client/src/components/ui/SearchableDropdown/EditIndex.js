// import { useState } from "react";
// import PropTypes from "prop-types";
// import { BsCaretDown } from "react-icons/bs";
// import { useDispatch } from "react-redux";

// const SearchableDropdown = ({ items, handleSelect, categoryName ,setFormData, formData}) => {
//   // alert(categoryName);
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();
//   console.log("categoryName ", categoryName);
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectItem = (item) => {
//     console.log("items---> ", item);
//     handleSelect(item);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [categoryName]: {
//         id: item.id,
//         name: item.name,
//       },
//     }));
//     setIsOpen(false);
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-between cursor-pointer bg-white border">
//       <p className="font-weight-bold m-1">Selected Category: {categoryName}</p>
//       <div className="dropdown">
//         <label
//           tabIndex={0}
//           className="m-1 btn btn-primary btn-circle"
//           onClick={toggleDropdown}
//         >
//           <BsCaretDown className="fs-4 text-dark" />
//         </label>
//         {isOpen && (
//           <div
//             className="p-2 shadow menu dropdown-content position-absolute bg-white rounded"
//             style={{ width: "250%", zIndex: 3 }}
//           >
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Search..."
//               onChange={handleSearch}
//             />
//             <ul tabIndex={0} className="list-group h-25 overflow-auto">
//               {filteredItems.map((item, index) => (
//                 <li key={index} className="list-group-item">
//                   <a
//                     href="#!"
//                     onClick={() =>
//                       selectItem({
//                         id: item._id,
//                         name: item.name,
//                         // commissionType: item.commissionType,
//                         // commissionTypeValue: item.commissionTypeValue,
//                       })
//                     }
//                   >
//                     {console.log("Items.name ----", item.name)}
//                     {item.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // SearchableDropdown.propTypes = {
// //   items: PropTypes.arrayOf(PropTypes.object).isRequired,
// //   handleSelect: PropTypes.func.isRequired,
// //   categoryName: PropTypes.string.isRequired,
// // };

// export default SearchableDropdown;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsCaretDown } from "react-icons/bs";

const SearchableDropdown = ({ items, handleSelect, categoryName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(categoryName || "");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectItem = (item) => {
    handleSelect(item);
    setSelectedOption(item.name); // Update selected option
    setIsOpen(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between cursor-pointer bg-white border">
      <div className="dropdown w-100">
        <button className="btn btn-primary w-100" onClick={toggleDropdown}>
          {selectedOption
            ? `Selected Category: ${selectedOption}`
            : `Select a category ${categoryName}`}
          <BsCaretDown className="ms-2" />
        </button>
        {isOpen && (
          <div
            className="p-2 shadow menu dropdown-content position-absolute bg-white rounded"
            style={{ width: "100%", zIndex: 3 }}
          >
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <ul className="list-group h-25 overflow-auto">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer list-group-item"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() =>
                    selectItem({
                      id: item._id,
                      name: item.name,
                      // Add other properties if needed
                    })
                  }
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// SearchableDropdown.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.object).isRequired,
//   handleSelect: PropTypes.func.isRequired,
//   categoryName: PropTypes.string.isRequired,
// };

export default SearchableDropdown;
