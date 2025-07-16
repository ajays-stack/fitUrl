import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const header = req.headers['authorization']; //  use correct header key

    if (!header) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = header.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); //  Verify token

    req.email = decoded.email; //  Save email from decoded token
    next(); //  Go to next middleware or route
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
