const express = require("express");
const router = express.Router();

router.post("/estimate", (req,res)=>{

const { distance } = req.body;

const baseFare = 50;
const perKm = 12;

const total = baseFare + (distance * perKm);

res.json({
distance,
fare: total
});

});

module.exports = router;