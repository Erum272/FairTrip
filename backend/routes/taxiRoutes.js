const express = require("express")
const router = express.Router()



/* =====================================
FAKE TAXI DATABASE
===================================== */

let taxiRates = {

baseFare: 50,

perKm: 12,

nightCharge: 1.5,

airportExtra: 100

}



let taxiTrips = []



/* =====================================
UTILITIES
===================================== */

function generateTripId(){

return Math.floor(Math.random()*100000)

}



/* =====================================
GET TAXI RATES
===================================== */

router.get("/rates",(req,res)=>{

res.json(taxiRates)

})



/* =====================================
ESTIMATE TAXI FARE
===================================== */

router.post("/estimate",(req,res)=>{

const { distance , time } = req.body

if(!distance){

return res.status(400).json({
message:"Distance required"
})

}

let fare = taxiRates.baseFare + (distance * taxiRates.perKm)

if(time === "night"){

fare = fare * taxiRates.nightCharge

}

res.json({

distance,
estimatedFare:fare

})

})



/* =====================================
AIRPORT TAXI ESTIMATE
===================================== */

router.post("/airport",(req,res)=>{

const { distance } = req.body

let fare = taxiRates.baseFare + (distance * taxiRates.perKm)

fare += taxiRates.airportExtra

res.json({

distance,
airportFare:fare

})

})



/* =====================================
SAVE TRIP
===================================== */

router.post("/trip",(req,res)=>{

const { distance , fare } = req.body

const trip = {

id:generateTripId(),
distance,
fare,
date:new Date()

}

taxiTrips.push(trip)

res.json({

message:"Trip saved",
trip

})

})



/* =====================================
GET ALL TRIPS
===================================== */

router.get("/trips",(req,res)=>{

res.json(taxiTrips)

})



/* =====================================
DELETE TRIP
===================================== */

router.delete("/trip/:id",(req,res)=>{

const id = parseInt(req.params.id)

taxiTrips = taxiTrips.filter(t => t.id !== id)

res.json({

message:"Trip removed"

})

})



/* =====================================
AVERAGE FARE ANALYTICS
===================================== */

router.get("/analytics/average",(req,res)=>{

if(taxiTrips.length === 0){

return res.json({
averageFare:0
})

}

let sum = taxiTrips.reduce((a,b)=>a+b.fare,0)

let avg = sum / taxiTrips.length

res.json({

averageFare:avg

})

})



/* =====================================
CHEAPEST TRIPS
===================================== */

router.get("/analytics/cheap",(req,res)=>{

let sorted = [...taxiTrips].sort((a,b)=>a.fare-b.fare)

res.json(sorted.slice(0,5))

})



/* =====================================
MOST EXPENSIVE TRIPS
===================================== */

router.get("/analytics/expensive",(req,res)=>{

let sorted = [...taxiTrips].sort((a,b)=>b.fare-a.fare)

res.json(sorted.slice(0,5))

})



module.exports = router