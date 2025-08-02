const express = require("express");
const { register, login,updateUser, } = require("../controllers/authControllers");
const router = express.Router();
const { requiresAuth } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/users/:id", requiresAuth, updateUser);

module.exports = router;
