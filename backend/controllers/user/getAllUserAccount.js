import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

/**
 * @description Get All User Profile
 * @api GET /api/v1/user/all
 * @access PRIVATE
 *
 */
const getAllUserAccount = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments({});

  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("-refreshToken")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / pageSize),
    users,
  });
});

export default getAllUserAccount;
