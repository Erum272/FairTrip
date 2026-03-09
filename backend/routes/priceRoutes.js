const express = require("express");
const router = express.Router();

const { prices } = require("../database/database");

router.get("/", (req, res) => {
res.json(prices);
});

router.post("/check", (req, res) => {

const { item, price } = req.body;

const found = prices.find(p => p.item.toLowerCase() === item.toLowerCase());

if(!found){
return res.json({ message: "No reference price found" });
}

if(price > found.price){
res.json({ status:"overpriced", actual:found.price });
}else{
res.json({ status:"fair", actual:found.price });
}

});

module.exports = router;