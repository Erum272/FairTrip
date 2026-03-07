const express = require("express");
const router = express.Router();

const { getVendors, addVendor } = require("../controllers/vendorController");

router.get("/", getVendors);
router.post("/", addVendor);

module.exports = router;
