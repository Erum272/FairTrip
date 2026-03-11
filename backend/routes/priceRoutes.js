const express = require("express");
const router = express.Router();

const { prices } = require("../database/database");



/* ======================================================
UTILITY FUNCTIONS
====================================================== */

function normalize(text){

return text.toLowerCase().trim();

}

function generateId(){

return Math.floor(Math.random()*100000);

}



/* ======================================================
VALIDATION MIDDLEWARE
====================================================== */

function validatePriceInput(req,res,next){

const { item, price } = req.body;

if(!item || !price){

return res.status(400).json({

message:"Item and price required"

});

}

next();

}



/* ======================================================
GET ALL PRICES
====================================================== */

router.get("/", (req,res)=>{

res.json(prices);

});



/* ======================================================
SEARCH PRICE
====================================================== */

router.get("/search",(req,res)=>{

const query = normalize(req.query.q || "");

const results = prices.filter(p =>
normalize(p.item).includes(query)
);

res.json(results);

});



/* ======================================================
GET PRICE BY ID
====================================================== */

router.get("/:id",(req,res)=>{

const id = parseInt(req.params.id);

const item = prices.find(p => p.id === id);

if(!item){

return res.status(404).json({

message:"Price not found"

});

}

res.json(item);

});



/* ======================================================
PRICE CHECKER
====================================================== */

router.post("/check",validatePriceInput,(req,res)=>{

const { item, price } = req.body;

const found = prices.find(p =>
normalize(p.item) === normalize(item)
);

if(!found){

return res.json({

status:"unknown",
message:"No reference price available"

});

}

if(price > found.price){

return res.json({

status:"overpriced",
actual:found.price

});

}

if(price < found.price){

return res.json({

status:"cheap",
actual:found.price

});

}

return res.json({

status:"fair",
actual:found.price

});

});



/* ======================================================
COMPARE MULTIPLE PRICES
====================================================== */

router.post("/compare",(req,res)=>{

const { item, vendorPrices } = req.body;

if(!vendorPrices || vendorPrices.length === 0){

return res.status(400).json({

message:"Vendor prices required"

});

}

const average =
vendorPrices.reduce((a,b)=>a+b,0)
/ vendorPrices.length;

res.json({

item,
averagePrice:average,
vendorPrices

});

});



/* ======================================================
ADD PRICE
====================================================== */

router.post("/add",validatePriceInput,(req,res)=>{

const { item, price, category, city } = req.body;

const newItem = {

id:generateId(),
item,
price,
category:category || "general",
city:city || "global"

};

prices.push(newItem);

res.json({

message:"Price added successfully",
data:newItem

});

});



/* ======================================================
UPDATE PRICE
====================================================== */

router.put("/:id",(req,res)=>{

const id = parseInt(req.params.id);

const { price } = req.body;

const item = prices.find(p => p.id === id);

if(!item){

return res.status(404).json({

message:"Price item not found"

});

}

item.price = price;

res.json({

message:"Price updated",
item

});

});



/* ======================================================
DELETE PRICE
====================================================== */

router.delete("/:id",(req,res)=>{

const id = parseInt(req.params.id);

const index = prices.findIndex(p => p.id === id);

if(index === -1){

return res.status(404).json({

message:"Item not found"

});

}

prices.splice(index,1);

res.json({

message:"Price removed"

});

});



/* ======================================================
FILTER BY CATEGORY
====================================================== */

router.get("/category/:category",(req,res)=>{

const category = normalize(req.params.category);

const result = prices.filter(p =>
normalize(p.category) === category
);

res.json(result);

});



/* ======================================================
FILTER BY CITY
====================================================== */

router.get("/city/:city",(req,res)=>{

const city = normalize(req.params.city);

const result = prices.filter(p =>
normalize(p.city) === city
);

res.json(result);

});



/* ======================================================
TOP EXPENSIVE ITEMS
====================================================== */

router.get("/analytics/expensive",(req,res)=>{

const sorted = [...prices].sort(
(a,b)=>b.price-a.price
);

res.json(sorted.slice(0,5));

});



/* ======================================================
CHEAPEST ITEMS
====================================================== */

router.get("/analytics/cheap",(req,res)=>{

const sorted = [...prices].sort(
(a,b)=>a.price-b.price
);

res.json(sorted.slice(0,5));

});



/* ======================================================
PRICE STATS
====================================================== */

router.get("/analytics/stats",(req,res)=>{

const total = prices.length;

const sum = prices.reduce(
(a,b)=>a + b.price,0
);

const avg = sum / total;

res.json({

totalItems:total,
averagePrice:avg

});

});



/* ======================================================
PRICE ALERT SYSTEM
====================================================== */

router.post("/alert",(req,res)=>{

const { item, threshold } = req.body;

const found = prices.find(p =>
normalize(p.item) === normalize(item)
);

if(!found){

return res.json({

message:"Item not found"

});

}

if(found.price > threshold){

return res.json({

alert:true,
message:"Price exceeded threshold"

});

}

res.json({

alert:false

});

});



/* ======================================================
BULK PRICE UPLOAD
====================================================== */

router.post("/bulk",(req,res)=>{

const { items } = req.body;

if(!Array.isArray(items)){

return res.status(400).json({

message:"Array required"

});

}

items.forEach(i => {

prices.push({

id:generateId(),
item:i.item,
price:i.price,
category:i.category || "general"

});

});

res.json({

message:"Bulk upload complete",
count:items.length

});

});



/* ======================================================
RESET DATABASE (ADMIN)
====================================================== */

router.post("/admin/reset",(req,res)=>{

prices.length = 0;

res.json({

message:"Price database cleared"

});

});



/* ======================================================
EXPORT ROUTER
====================================================== */

module.exports = router;