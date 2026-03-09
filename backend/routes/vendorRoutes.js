const express = require("express");
const router = express.Router();

const { vendors } = require("../database/database");

router.get("/", (req,res)=>{
res.json(vendors);
});

module.exports = router;