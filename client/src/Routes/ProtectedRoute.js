import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { PATHS } from "./paths";

export const useAuth = ()=>{
let user;
let vendor;
let admin;
let role;
const _user = localStorage.getItem("role");

 if (_user) {
   role = JSON.parse(_user);
   if (role === "customer") {
     user = role;
   } else if (role === "vendor") {
     vendor = role;
   } else if (role === "admin") {
     admin = role;
   }
 }

  if (user || vendor || admin) {
    return {
      auth: true,
      role: role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};

const RouteValidate = (defaultRole, localStorageRole) => {
  if (defaultRole === localStorageRole) return true;
  return false;
};

export const ProtectedRoute = ({ roleRequired, children, defaultRole }) => {
  const { auth, role } = useAuth();
  if (defaultRole !== role) {
    return <Navigate to={PATHS.permissionDenied} />;
  }

  if (!auth) {
    return <Navigate to={PATHS.login} />;
  }
  
  if (roleRequired) {
    if (role !== defaultRole) {
      return <Navigate to={PATHS.permissionDenied} />;
    } else if (role === "customer") {
      if (role === "customer" && RouteValidate(defaultRole, role)) {
        return children;
      }
    } else if (role === "vendor") {
      if (role === "vendor" && RouteValidate(defaultRole, role)) {
        return children;
      }
    } else if (role === "admin") {
      if (role === "admin" && RouteValidate(defaultRole, role)) {
        return children;
      }
    }

    return <Navigate to={PATHS.permissionDenied} />;
  }

  return children;
};

