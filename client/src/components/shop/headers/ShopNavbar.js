// import { TfiMenuAlt } from "react-icons/tfi";
// import React, { useEffect, useState } from "react";
// import { Menu, Dropdown, Select } from "antd";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";
// import API_WRAPPER from "../../../api";
// function ShopNavbar() {
//   const [current, setCurrent] = useState("mail");
//   const [navbarData, setNavbarData] = useState([]);
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const { Option } = Select;
//   const navigate = useNavigate();

//   const fetchCategoryData = async () => {
//     const response = await API_WRAPPER.get("/category/get-all-categories");
//     if (response.status === 200) {
//       setCategoriesData(response.data);
//     }
//   };
//  useEffect(() => {
//    fetchCategoryData();
//  }, []);
//   return <>Shop NavBar</>;
// }

// export default ShopNavbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Menu, Dropdown, Select } from "antd";
import API_WRAPPER from "../../../api/index.js";
import "./index.css";
const ShopNavbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [current, setCurrent] = useState("mail");
  const [navbarData, setNavbarData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const { Option } = Select;
  const navigate = useNavigate();

  const navbarData1 = [
    {
      _id: "2",
      title: "Bags",
      link: "bags",
      submenus: [
        {
          _id: "2-1",
          title: "Men",
          link: "shop/men",
          child: [
            { _id: "2-1-1", title: "T-Shirts", link: "shop/men/t-shirts" },
            { _id: "2-1-2", title: "Jeans", link: "shop/men/jeans" },
          ],
        },
        { _id: "2-2", title: "Women", link: "shop/women" },
      ],
    },
    {
      _id: "3",
      title: "Contact",
      link: "contact",
    },
  ];

  const getNavbarData = async () => {
    const response = await API_WRAPPER.get("/getNavbarMenu");
    console.log("Response getNavbarData", response.data);
    if (response.status === 200) {
      setNavbarData(response.data);
    }
  };

  const fetchCategoryData = async () => {
    const response = await API_WRAPPER.get("/category/get-all-categories");
    if (response.status === 200) {
      setCategoriesData(response.data);
    }
  };

  useEffect(() => {
    fetchCategoryData();
    getNavbarData();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // const renderSubMenuItems = (menuData) => {
  //   return menuData.map((menuItem) => {
  //     if (menuItem.submenus && menuItem.submenus.length > 0) {
  //       return (
  //         <li className="nav-item dropdown mx-3" key={menuItem._id}>
  //           <a
  //             className="nav-link dropdown-toggle"
  //             href="#"
  //             id={`navbarDropdown${menuItem._id}`}
  //             role="button"
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             {menuItem.title.toUpperCase()}
  //           </a>
  //           <ul
  //             className="dropdown-menu"
  //             aria-labelledby={`navbarDropdown${menuItem._id}`}
  //             style={{ overflow: "visible" }}
  //           >
  //             {menuItem.submenus.map((submenuItem) => (
  //               <React.Fragment key={submenuItem._id}>
  //                 {submenuItem.child && submenuItem.child.length > 0 ? (
  //                   <li className="dropdown-submenu position-relative">
  //                     <a
  //                       className="dropdown-item dropdown-toggle"
  //                       href="#"
  //                       id={`navbarDropdown${submenuItem._id}`}
  //                       role="button"
  //                       data-bs-toggle="dropdown"
  //                       aria-expanded="false"
  //                     >
  //                       {submenuItem.title}
  //                     </a>
  //                     <ul
  //                       className="dropdown-menu"
  //                       aria-labelledby={`navbarDropdown${submenuItem._id}`}
  //                       style={{
  //                         overflow: "visible",
  //                         position: "absolute",
  //                         top: "0",
  //                         left: "100%",
  //                       }}
  //                     >
  //                       {submenuItem.child.map((childItem) => (
  //                         <li key={childItem._id}>
  //                           <Link
  //                             className="dropdown-item"
  //                             to={`/${childItem.link}`}
  //                           >
  //                             {childItem.title}
  //                           </Link>
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </li>
  //                 ) : (
  //                   <li key={submenuItem._id}>
  //                     <Link
  //                       className="dropdown-item"
  //                       to={`/${submenuItem.link}`}
  //                     >
  //                       {submenuItem.title}
  //                     </Link>
  //                   </li>
  //                 )}
  //               </React.Fragment>
  //             ))}
  //           </ul>
  //         </li>
  //       );
  //     } else if (menuItem.link) {
  //       return (
  //         <li className="nav-item mx-1" key={menuItem._id}>
  //           <Link className="nav-link" to={`/${menuItem.link}`}>
  //             {menuItem.title}
  //           </Link>
  //         </li>
  //       );
  //     } else {
  //       return (
  //         <li className="nav-item mx-1" key={menuItem._id}>
  //           <span
  //             className="nav-link"
  //             onClick={() => console.log("CLICKED ON SUB MENU")}
  //           >
  //             {menuItem.title}
  //           </span>
  //         </li>
  //       );
  //     }
  //   });
  // };

  // const renderSubMenuItems = (menuData) => {
  //   return menuData.map((menuItem) => {
  //     if (menuItem.submenus && menuItem.submenus.length > 0) {
  //       return (
  //         <li className="nav-item dropdown mx-3" key={menuItem._id}>
  //           <a
  //             className="nav-link dropdown-toggle"
  //             href="#"
  //             id={`navbarDropdown${menuItem._id}`}
  //             role="button"
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             {menuItem.title.toUpperCase()}
  //           </a>
  //           <ul
  //             className="dropdown-menu"
  //             aria-labelledby={`navbarDropdown${menuItem._id}`}
  //           >
  //             {menuItem.submenus.map((submenuItem) => (
  //               <React.Fragment key={submenuItem._id}>
  //                 {submenuItem.child && submenuItem.child.length > 0 ? (
  //                   <li className="dropdown-submenu">
  //                     <a
  //                       className="dropdown-item dropdown-toggle"
  //                       href="#"
  //                       id={`navbarDropdown${submenuItem._id}`}
  //                       role="button"
  //                       data-bs-toggle="dropdown"
  //                       aria-expanded="false"
  //                     >
  //                       {submenuItem.title}
  //                     </a>
  //                     <ul
  //                       className="dropdown-menu"
  //                       aria-labelledby={`navbarDropdown${submenuItem._id}`}
  //                     >
  //                       {submenuItem.child.map((childItem) => (
  //                         <li key={childItem._id}>
  //                           <Link
  //                             className="dropdown-item"
  //                             to={`/${childItem.link}`}
  //                           >
  //                             {childItem.title}
  //                           </Link>
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </li>
  //                 ) : (
  //                   <li key={submenuItem._id}>
  //                     <Link className="dropdown-item" to={`/${submenuItem.link}`}>
  //                       {submenuItem.title}
  //                     </Link>
  //                   </li>
  //                 )}
  //               </React.Fragment>
  //             ))}
  //           </ul>
  //         </li>
  //       );
  //     } else if (menuItem.link) {
  //       return (
  //         <li className="nav-item mx-1" key={menuItem._id}>
  //           <Link className="nav-link" to={`/${menuItem.link}`}>
  //             {menuItem.title}
  //           </Link>
  //         </li>
  //       );
  //     } else {
  //       return (
  //         <li className="nav-item mx-1" key={menuItem._id}>
  //           <span
  //             className="nav-link"
  //             onClick={() => console.log("CLICKED ON SUB MENU")}
  //           >
  //             {menuItem.title}
  //           </span>
  //         </li>
  //       );
  //     }
  //   });
  // };

  const renderSubMenuItems = (menuData) => {
    return menuData.map((menuItem) => {
      if (menuItem.submenus && menuItem.submenus.length > 0) {
        return (
          <li className="nav-item dropdown mx-3" key={menuItem._id}>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id={`navbarDropdown${menuItem._id}`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {menuItem.title.toUpperCase()}
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby={`navbarDropdown${menuItem._id}`}
            >
              {menuItem.submenus.map((submenuItem) => (
                <React.Fragment key={submenuItem._id}>
                  {submenuItem.child && submenuItem.child.length > 0 ? (
                    <li className="dropdown-submenu">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        id={`navbarDropdown${submenuItem._id}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {submenuItem.title}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`navbarDropdown${submenuItem._id}`}
                      >
                        {submenuItem.child.map((childItem) => (
                          <li key={childItem._id}>
                            <Link
                              className="dropdown-item"
                              to={`/${childItem.link}`}
                            >
                              {childItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={submenuItem._id}>
                      <Link
                        className="dropdown-item"
                        to={`/${submenuItem.link}`}
                      >
                        {submenuItem.title}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </li>
        );
      } else if (menuItem.link) {
        return (
          <li className="nav-item mx-1" key={menuItem._id}>
            <Link className="nav-link" to={`/${menuItem.link}`}>
              {menuItem.title}
            </Link>
          </li>
        );
      } else {
        return (
          <li className="nav-item mx-1" key={menuItem._id}>
            <span
              className="nav-link"
              onClick={() => console.log("CLICKED ON SUB MENU")}
            >
              {menuItem.title}
            </span>
          </li>
        );
      }
    });
  };

  return (
    <>
      {/* <div className="bg-light join w-full rounded-none d-flex align-items-center px-4">
        <div className="dropdown me-3">
          <button
            className="btn btn-primary dropdown-toggle d-flex align-items-center"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <TfiMenuAlt className="me-2" />
            All Categories
            <RiArrowDropDownLine size={24} className="ms-2" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
            {categoriesData.map((category) => (
              <li key={category._id}>
                <button
                  className="dropdown-item"
                  onClick={() => navigate(`/category/${category.name}`)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="navbar-nav d-flex flex-row">
          {renderSubMenuItems(navbarData)}
        </ul>
      </div> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="dropdown me-3">
            <button
              className="btn btn-primary dropdown-toggle d-flex align-items-center"
              type="button"
              id="categoryDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <TfiMenuAlt className="me-2" />
              All Categories
              <RiArrowDropDownLine size={24} className="ms-2" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              {categoriesData.map((category) => (
                <li key={category._id}>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate(`/category/${category.name}`)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {renderSubMenuItems(navbarData)}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ShopNavbar;
