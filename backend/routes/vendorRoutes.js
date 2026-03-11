const express = require("express")
const router = express.Router()



/* =====================================
VENDOR DATABASE
===================================== */

let vendors = [

{
id:1,
name:"City Souvenir Shop",
rating:4.5,
city:"Delhi"
},

{
id:2,
name:"Tourist Gift Market",
rating:4.2,
city:"Bangkok"
},

{
id:3,
name:"Paris Handicrafts",
rating:4.7,
city:"Paris"
}

]



/* =====================================
UTILITIES
===================================== */

function generateVendorId(){

return Math.floor(Math.random()*100000)

}



/* =====================================
GET ALL VENDORS
===================================== */

router.get("/",(req,res)=>{

res.json(vendors)

})



/* =====================================
SEARCH VENDOR
===================================== */

router.get("/search",(req,res)=>{

const query = req.query.q?.toLowerCase() || ""

const result = vendors.filter(v =>
v.name.toLowerCase().includes(query)
)

res.json(result)

})



/* =====================================
GET VENDOR BY ID
===================================== */

router.get("/:id",(req,res)=>{

const id = parseInt(req.params.id)

const vendor = vendors.find(v => v.id === id)

if(!vendor){

return res.status(404).json({
message:"Vendor not found"
})

}

res.json(vendor)

})



/* =====================================
ADD VENDOR
===================================== */

router.post("/add",(req,res)=>{

const { name , rating , city } = req.body

const newVendor = {

id:generateVendorId(),
name,
rating,
city

}

vendors.push(newVendor)

res.json({

message:"Vendor added",
vendor:newVendor

})

})



/* =====================================
UPDATE VENDOR
===================================== */

router.put("/:id",(req,res)=>{

const id = parseInt(req.params.id)

const vendor = vendors.find(v => v.id === id)

if(!vendor){

return res.status(404).json({
message:"Vendor not found"
})

}

vendor.rating = req.body.rating || vendor.rating
vendor.city = req.body.city || vendor.city

res.json({

message:"Vendor updated",
vendor

})

})



/* =====================================
DELETE VENDOR
===================================== */

router.delete("/:id",(req,res)=>{

const id = parseInt(req.params.id)

vendors = vendors.filter(v => v.id !== id)

res.json({

message:"Vendor removed"

})

})



/* =====================================
TOP RATED VENDORS
===================================== */

router.get("/analytics/top",(req,res)=>{

let sorted = [...vendors].sort((a,b)=>b.rating-a.rating)

res.json(sorted.slice(0,5))

})



/* =====================================
VENDOR STATS
===================================== */

router.get("/analytics/stats",(req,res)=>{

let avgRating = vendors.reduce((a,b)=>a+b.rating,0) / vendors.length

res.json({

totalVendors:vendors.length,
averageRating:avgRating

})

})



module.exports = router