import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        // Check if token exists in headers
        const { token } = req.headers;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized! Login Again" 
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Initialize req.body if it doesn't exist
        if (!req.body) {
            req.body = {};
        }
        
        req.body.userId = decoded.id;
        
        // console.log(`Authenticated user: ${decoded.id}`);
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token. Please login again." 
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Your session has expired. Please login again." 
            });
        }
        
        // Log the error for debugging
        // console.error("Auth middleware error:", error);
        
        return res.status(500).json({ 
            success: false, 
            message: "Authentication failed. Please try again." 
        });
    }
};

export default authUser;
