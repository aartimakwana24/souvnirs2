// import React, { useState, useEffect } from "react";

// const product = {
//   variants: [
//     {
//       _id: "66b9da38a8fcf2846e0316ba",
//       Size: "6",
//       Brand: "Puma",
//       Color: "white",
//     },
//     {
//       _id: "66b9da38a8fcf2846e0316bc",
//       Size: "6",
//       Brand: "nike",
//       Color: "white",
//     },
//     {
//       _id: "66b9da38a8fcf2846e0316be",
//       Size: "6",
//       Brand: "nike",
//       Color: "black",
//     },
//     {
//       _id: "66b9da38a8fcf2846e0316c0",
//       Size: "7",
//       Brand: "Puma",
//       Color: "white",
//     },
//     {
//       _id: "66b9da39a8fcf2846e0316c2",
//       Size: "7",
//       Brand: "Puma",
//       Color: "black",
//     },
//     {
//       _id: "66b9da39a8fcf2846e0316c4",
//       Size: "7",
//       Brand: "nike",
//       Color: "white",
//     },
//     {
//       _id: "66b9da39a8fcf2846e0316c6",
//       Size: "6",
//       Brand: "Puma",
//       Color: "black",
//     },
//     {
//       _id: "66b9da39a8fcf2846e0316c8",
//       Size: "7",
//       Brand: "nike",
//       Color: "black",
//     },
//     {
//       _id: "66b9da39a8fcf2846e0316ca",
//       Size: "8",
//       Brand: "Puma",
//       Color: "white",
//     },
//   ],
// };

// const unavailableVariants = [
//   { Size: "7", Brand: "nike", Color: "white" },
//   { Size: "7", Brand: "nike", Color: "black" },
//   { Size: "8", Brand: "Puma", Color: "black" },
// ];

// const Demo = () => {
//   const [selectedAttributes, setSelectedAttributes] = useState({});
//   const [attributes, setAttributes] = useState({});

//   useEffect(() => {
//     // Extract attributes dynamically from product variants
//     const attributeKeys = Object.keys(product.variants[0]).filter(
//       (key) => key !== "_id"
//     );

//     const attributes = attributeKeys.reduce((acc, key) => {
//       acc[key] = [...new Set(product.variants.map((v) => v[key]))];
//       return acc;
//     }, {});

//     setAttributes(attributes);

//     // Set default selections
//     const defaultSelections = attributeKeys.reduce((acc, key) => {
//       acc[key] = attributes[key][0];
//       return acc;
//     }, {});

//     setSelectedAttributes(defaultSelections);
//   }, []);

//   const handleAttributeChange = (attribute, value) => {
//     setSelectedAttributes((prev) => ({
//       ...prev,
//       [attribute]: value,
//     }));
//   };

//   const isOutOfStock = (variant) => {
//     return unavailableVariants.some((u) =>
//       Object.keys(u).every((key) => u[key] === variant[key])
//     );
//   };

//   return (
//     <div>
//       <h1>Select Filters</h1>

//       {Object.keys(attributes).map((attribute) => (
//         <div key={attribute}>
//           <h2>{attribute}</h2>
//           {attributes[attribute].map((value) => {
//             const variant = {
//               ...selectedAttributes,
//               [attribute]: value,
//             };
//             const outOfStock = isOutOfStock(variant);

//             return (
//               <label key={value} style={{ opacity: outOfStock ? 0.5 : 1 }}>
//                 <input
//                   type="radio"
//                   name={attribute}
//                   value={value}
//                   checked={selectedAttributes[attribute] === value}
//                   onChange={() => handleAttributeChange(attribute, value)}
//                   disabled={outOfStock}
//                 />
//                 {value} {outOfStock && "(Out of Stock)"}
//               </label>
//             );
//           })}
//         </div>
//       ))}

//       <h2>Filtered Variants</h2>
//       <ul>
//         {product.variants
//           .filter((v) =>
//             Object.keys(selectedAttributes).every(
//               (key) => v[key] === selectedAttributes[key]
//             )
//           )
//           .map((variant) => (
//             <li key={variant._id}>
//               {Object.keys(variant)
//                 .filter((key) => key !== "_id")
//                 .map((key) => (
//                   <span key={key}>
//                     {key}: {variant[key]}{" "}
//                   </span>
//                 ))}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default Demo;
// 0000000000000---------------------------------------------------------------


import React, { useState, useEffect } from "react";

const product = {
  variants: [
    {
      Size: "6",
      Brand: "Puma",
      Color: "white",
    },
    {
      Size: "6",
      Brand: "nike",
      Color: "white",
    },
    {
      Size: "6",
      Brand: "nike",
      Color: "black",
    },
    {
      Size: "7",
      Brand: "Puma",
      Color: "white",
    },
    {
      Size: "7",
      Brand: "Puma",
      Color: "black",
    },
    {
      Size: "7",
      Brand: "nike",
      Color: "white",
    },
    {
      Size: "6",
      Brand: "Puma",
      Color: "black",
    },
    {
      Size: "7",
      Brand: "nike",
      Color: "black",
    },
    {
      Size: "8",
      Brand: "Puma",
      Color: "white",
    },
  ],
};

const unavailableVariants = [
  { Size: "7", Brand: "nike", Color: "white" },
  { Size: "7", Brand: "nike", Color: "black" },
  { Size: "8", Brand: "Puma", Color: "black" },
];

const Demo = () => {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    // Extract attributes dynamically from product variants
    const attributeKeys = Object.keys(product.variants[0]).filter(
      (key) => key !== "_id"
    );

    const attributes = attributeKeys.reduce((acc, key) => {
      acc[key] = [...new Set(product.variants.map((v) => v[key]))];
      return acc;
    }, {});

    setAttributes(attributes);

    // Set default selections
    const defaultSelections = attributeKeys.reduce((acc, key) => {
      acc[key] = attributes[key][0];
      return acc;
    }, {});

    setSelectedAttributes(defaultSelections);
  }, []);

  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const isOutOfStock = (variant) => {
    return unavailableVariants.some((u) =>
      Object.keys(u).every((key) => u[key] === variant[key])
    );
  };

  return (
    <div>
      <h1>Select Filters</h1>

      {Object.keys(attributes).map((attribute) => (
        <div key={attribute}>
          <h2>{attribute}</h2>
          {attributes[attribute].map((value) => {
            const variant = {
              ...selectedAttributes,
              [attribute]: value,
            };
            const outOfStock = isOutOfStock(variant);

            return (
              <label key={value} style={{ opacity: outOfStock ? 0.5 : 1 }}>
                <input
                  type="radio"
                  name={attribute}
                  value={value}
                  checked={selectedAttributes[attribute] === value}
                  onChange={() => handleAttributeChange(attribute, value)}
                  style={{ color: outOfStock ?"gray" : "" }}
                />
                {value} {outOfStock && "(Out of Stock)"}
              </label>
            );
          })}
        </div>
      ))}

      <h2>Filtered Variants</h2>
      <ul>
        {product.variants
          .filter((v) =>
            Object.keys(selectedAttributes).every(
              (key) => v[key] === selectedAttributes[key]
            )
          )
          .map((variant, index) => (
            <li key={index}>
              {Object.keys(variant).map((key) => (
                <span key={key}>
                  {key}: {variant[key]}{" "}
                </span>
              ))}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Demo;
