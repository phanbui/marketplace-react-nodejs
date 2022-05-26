const express = require('express');
const router = express.Router({mergeParams: true});

const userController = require("../controllers/users");

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;