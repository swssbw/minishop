const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  allUsers,
  getUserDetails,
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails);

module.exports = router;
