import express from "express";
import getUserProfile from "../controllers/user/getUserProfile.js";
import checkAuth from "../middlewares/authMiddleware.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import deleteMyAcccount from "../controllers/user/deleteMyAccount.js";
import role from "../middlewares/roleMiddleware.js";
import getAllUserAccount from "../controllers/user/getAllUserAccount.js";
import deleteUserAccount from "../controllers/user/deleteUserAccount.js";

const router = express.Router();

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAcccount);

router
  .route("/all")
  .get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccount);

router
  .route("/:id")
  .delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount);

export default router;
