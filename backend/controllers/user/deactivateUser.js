import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

/**
 * @description Deactive User
 * @api DELETE /api/v1/user/:id/deactivate
 * @access PRIVATE
 *
 */
const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.active = false;

    await user.save();

    res.json({
      success: true,
      message: "User deactivated successfully",
    });
  } else {
    res.sendStatus(404);
    throw new Error("User not found");
  }
});

export default deactivateUser;
