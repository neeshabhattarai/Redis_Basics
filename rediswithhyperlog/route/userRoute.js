const express = require("express");
const router = express.Router();
const { addUser, getUser, removeUser } = require("../controller/user");

router.post("/add", addUser);
router.get("/get/:userId", getUser);
router.delete("/remove/:userId", removeUser);

module.exports = router;