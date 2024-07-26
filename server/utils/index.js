export const getOperator = (operatorString) => {
  switch (operatorString) {
    case "greaterThan":
      return "$gt";
    case "equal":
      return "$eq";
    case "not equal":
      return "$ne";
    case "lessThan":
      return "$lt";
    // case "is empty":
    //   return "$exists";
    // case "is not empty":
    //   return "$exists";
    case "contains":
      return "$regex";
    case "does not contain":
      return "$not";
    case "starts with":
      return "$regex";
    case "ends with":
      return "$regex";
    default:
      return "";
  }
};
export const roles = {
  admin: "admin",
  vendor: "vendor",
  customer: "customer",
};