export default (req, res, next) => {
  if (!req.body.repos || !Array.isArray(req.body.repos)) {
    return res
      .status(400)
      .json({ message: "Array of repos should be provided" });
  }
  next();
};
