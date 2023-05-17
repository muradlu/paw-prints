import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: "Route doesn't exist" });
};

export default notFoundMiddleware;
