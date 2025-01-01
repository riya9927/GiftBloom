import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    // Decode and verify the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // Verify if the token belongs to the admin
    if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not Authorized. Login Again" });
    }

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export default adminAuth;
