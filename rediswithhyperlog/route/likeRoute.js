const { addLike, addView } = require("../controller/likes");
const express = require("express");
const router = express.Router();

router.post("/add", addLike);
router.post("/view", addView);

module.exports = router;