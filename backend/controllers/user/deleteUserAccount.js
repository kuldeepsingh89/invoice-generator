import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

/**
 * @description Delete User Account
 * @api DELETE /api/v1/user/:id
 * @access PRIVATE
 *
 */
const deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const result = await user.remove();

    res.json({
      success: true,
      message: `User ${result.firstName}, deleted successfully`,
    });
  } else {
    res.sendStatus(404);
    throw new Error("user not found");
  }
});

export default deleteUserAccount;
