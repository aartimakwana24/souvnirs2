// import { useState } from "react";
// import PropTypes from "prop-types";
// import { motion } from "framer-motion";
// import { fadeInVariants } from "../../../animations/index";
// import Card from "../Card/index";
// import { Link } from "react-router-dom";


// const Tabs = ({ tabs, enableBorder, hasCard, alignCenter }) => {
//   const [activeTab, setActiveTab] = useState(0);

//   // const getCardContainerClass = () => {
//   //   switch (activeTab) {
//   //     case 0: // By year
//   //       return "card-container-by-year";
//   //     case 1: // By month
//   //       return "card-container-by-month";
//   //     case 2: // By week
//   //       return "card-container-by-week";
//   //     default:
//   //       return "card-container-by-year"; // Default to by year
//   //   }
//   // };
  

//   return hasCard ? (
//     <Card>
//       <motion.div
//         initial="initial"
//         animate="animate"
//         variants={fadeInVariants}
//         className={`mt-4 rounded-xl ${
//           enableBorder ? "border border-gray-300" : ""
//         } bg-light`}
//       >
//         <div className="d-flex">
//           {tabs.map((tab, index) => (
//             <button
//               key={index}
//               className={`px-4 py-2 border border-gray-300 text-lg font-bold hover:text-gray-700 cursor-pointer ${
//                 activeTab === index
//                   ? "text-blue border-b-2 border-blue py-4"
//                   : ""
//               }`}
//               onClick={() => setActiveTab(index)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <div  className={`d-flex ${alignCenter ? "justify-content-center" : ""}`}>
//           {tabs.map((tab, index) => (
//             <div
//               key={index}
//               className={`p-4 bg-light rounded-b-xl ${
//                 activeTab === index
//                   ? "bg-light transition-opacity duration-500"
//                   : "hidden"
//               }`}
//               style={{
//                 opacity: activeTab === index ? 1 : 0,
//                 width: activeTab === index ? "100%" : "0",
//               }}
//             >
//               {tab.content}
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </Card>
//   ) : (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       variants={fadeInVariants}
//       className={`mt-4 rounded-xl ${
//         enableBorder ? "border border-gray-300" : ""
//       } bg-light`}
//     >
//       <div className={`d-flex ${alignCenter ? "justify-content-center" : ""}`}>
//         {tabs.map((tab, index) => (
//           <Link
//             key={index}
//             className={`px-4 py-2 text-xs hover:text-gray-700 cursor-pointer ${
//               activeTab === index ? "text-blue" : "text-black"
//             }`}
//             onClick={() => setActiveTab(index)}
//           >
//             {tab.label}
//           </Link>
//         ))}
//       </div>

//       <div className={`d-flex  ${alignCenter ? "justify-content-center" : ""}`}>
//         {tabs.map((tab, index) => (
//           <div
//             key={index}
//             className={`p-4 bg-light rounded-b-xl${
//               activeTab === index ? "bg-light" : "hidden"
//             }`}
//             style={{
//               opacity: activeTab === index ? 1 : 0,
//               width: activeTab === index ? "100%" : "0",
//             }}
//           >
//             {tab.content}
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // tabs props
// Tabs.propTypes = {
//   enableBorder: PropTypes.bool,
//   hasCard: PropTypes.bool,
//   alignCenter: PropTypes.bool,
//   tabs: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       content: PropTypes.node.isRequired,
//     })
//   ).isRequired,
// };

// export default Tabs;



import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animations/index";
import Card from "../Card/index";
import { Link } from "react-router-dom";

const Tabs = ({ tabs, enableBorder, hasCard, alignCenter }) => {
  const [activeTab, setActiveTab] = useState(0);

  return hasCard ? (
    <Card>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`mt-4 rounded-xl ${
          enableBorder ? "border border-gray-300" : ""
        } bg-light`}
      >
        <div className="d-flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 border border-gray-300 text-lg font-bold hover:text-gray-700 cursor-pointer ${
                activeTab === index
                  ? "text-blue border-b-2 border-blue py-4"
                  : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 bg-light rounded-b-xl">
          {tabs[activeTab].content} {/* Render only active tab content */}
        </div>
      </motion.div>
    </Card>
  ) : (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className={`mt-4 rounded-xl ${
        enableBorder ? "border border-gray-300" : ""
      } bg-light`}
    >
      <div className={`d-flex ${alignCenter ? "justify-content-center" : ""}`}>
        {tabs.map((tab, index) => (
          <Link
            key={index}
            className={`px-3  text-xs hover:text-gray cursor-pointer link-no-underline ${
              activeTab === index ? "text-blue" : "text-black"
            }`}
            onClick={() => setActiveTab(index)}
            style={{
              textDecoration: "none", 
              borderBottom: activeTab === index ? "2px solid blue" : "none", 
              paddingBottom: "2px",
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className={`p-4 bg-light rounded-b-xl`}>
        {tabs[activeTab].content} {/* Render only active tab content */}
      </div>
    </motion.div>
  );
};

Tabs.propTypes = {
  enableBorder: PropTypes.bool,
  hasCard: PropTypes.bool,
  alignCenter: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Tabs;

