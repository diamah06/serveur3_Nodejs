// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next(); // user is admin, allow access
    } else {
      res.status(403).json({
        message: "Access denied. Only administrators have access to these resources."
      });
    }
  };
  
  module.exports = isAdmin;