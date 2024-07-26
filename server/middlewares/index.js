import jwt from "jsonwebtoken";
import { secretKey } from "../auth/authController.js";

const authMiddleware = (authorizedRoles) => (req, res, next) => {
  if (!req.header("Authorization")) {
    res.status(401).json({
      message: "no token passed",
    });
  }
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token found, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    if (!authorizedRoles.includes(decoded.role)) {
      return res
        .status(403)
        .json({ message: "Unauthorized role, access denied" });
    }

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied" });
  }
};

export default authMiddleware;
