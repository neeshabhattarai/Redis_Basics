const express = require("express");
const { addItem, getItem, updateView, deleteItem ,getView,getAllItems } = require("../controller/item");
const router = express.Router();

router.post("/add", addItem);
router.get("/get/:name", getItem);
router.put("/update/:name", updateView);
router.delete("/delete/:name", deleteItem);
router.get("/get/:name", getView);
router.get("/getAll", getAllItems);

module.exports = router;