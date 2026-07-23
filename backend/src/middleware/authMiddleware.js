module.exports = (req, res, next) => {
  // simple placeholder auth
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};