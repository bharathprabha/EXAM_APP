var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { signout, signup, signin } = require("../controllers/auth");

router.get("/signout", signout);

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 char").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 5 }),
  ],
  signup
);
//router.get("/signin",signin);
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 }),
  ],
  signin
);

module.exports = router;
