/* =====================================================
FAIRTRIP TAXI MODEL
Advanced Taxi Fare Intelligence System
===================================================== */

const crypto = require("crypto")

/* =====================================================
CLASS
===================================================== */

class TaxiTrip {

constructor(id,start,end,distance,fare,time,city){

this.id=id
this.start=start
this.end=end
this.distance=distance
this.fare=fare
this.time=time
this.city=city

this.createdAt=new Date()
this.updatedAt=new Date()

this.hash=this.generateHash()

}

/* =========================================
HASH
========================================= */

generateHash(){

return crypto
.createHash("sha256")
.update(this.start + this.end + this.distance)
.digest("hex")

}

/* =========================================
UPDATE
========================================= */

update(data){

if(data.distance) this.distance=data.distance
if(data.fare) this.fare=data.fare
if(data.city) this.city=data.city

this.updatedAt=new Date()

}

}



/* =====================================================
DATABASE
===================================================== */

let trips=[

new TaxiTrip(1,"Airport","Hotel",12,350,"day","Delhi"),
new TaxiTrip(2,"Station","Market",5,120,"day","Delhi"),
new TaxiTrip(3,"Hotel","Museum",3,90,"night","Paris")

]



/* =====================================================
BASE FARE CONFIG
===================================================== */

const pricing={

baseFare:50,
perKm:12,
nightMultiplier:1.5,
surgeMultiplier:2

}



/* =====================================================
VALIDATION
===================================================== */

function validateTrip(data){

if(!data.start) return "Start location required"
if(!data.end) return "End location required"
if(!data.distance) return "Distance required"

return null

}



/* =====================================================
FARE CALCULATION
===================================================== */

function calculateFare(distance,time){

let fare = pricing.baseFare + (distance * pricing.perKm)

if(time==="night"){

fare = fare * pricing.nightMultiplier

}

return Math.round(fare)

}



/* =====================================================
SURGE PRICING
===================================================== */

function calculateSurge(distance){

let fare = pricing.baseFare + (distance * pricing.perKm)

fare = fare * pricing.surgeMultiplier

return Math.round(fare)

}



/* =====================================================
CRUD
===================================================== */

function getAllTrips(){

return trips

}



function getTripById(id){

return trips.find(t=>t.id===id)

}



function addTrip(data){

let error = validateTrip(data)

if(error) throw new Error(error)

let id = trips.length + 1

let fare = calculateFare(data.distance,data.time)

let trip = new TaxiTrip(

id,
data.start,
data.end,
data.distance,
fare,
data.time || "day",
data.city || "Unknown"

)

trips.push(trip)

logAction("ADD_TRIP",trip)

return trip

}



function updateTrip(id,data){

let trip = getTripById(id)

if(!trip) return null

trip.update(data)

logAction("UPDATE_TRIP",trip)

return trip

}



function deleteTrip(id){

let index = trips.findIndex(t=>t.id===id)

if(index===-1) return false

let removed = trips.splice(index,1)

logAction("DELETE_TRIP",removed[0])

return true

}



/* =====================================================
FILTERS
===================================================== */

function filterByCity(city){

return trips.filter(t=>t.city===city)

}



function filterNightTrips(){

return trips.filter(t=>t.time==="night")

}



/* =====================================================
SORTING
===================================================== */

function sortByFareAsc(){

return [...trips].sort((a,b)=>a.fare-b.fare)

}



function sortByFareDesc(){

return [...trips].sort((a,b)=>b.fare-a.fare)

}



/* =====================================================
ANALYTICS
===================================================== */

function getAverageFare(){

let total=trips.reduce((sum,t)=>sum+t.fare,0)

return total/trips.length

}



function getLongestTrip(){

return trips.reduce((a,b)=> a.distance>b.distance?a:b )

}



function getShortestTrip(){

return trips.reduce((a,b)=> a.distance<b.distance?a:b )

}



function getCityTripStats(){

let stats={}

trips.forEach(t=>{

if(!stats[t.city]) stats[t.city]=0

stats[t.city]++

})

return stats

}



/* =====================================================
SCAM DETECTION
===================================================== */

function detectTaxiScam(distance,fare){

let expected = calculateFare(distance,"day")

if(fare > expected*1.7){

return{

status:"SCAM",
expectedFare:expected

}

}

return{

status:"FAIR",
expectedFare:expected

}

}



/* =====================================================
CACHE
===================================================== */

let cache={}

function cacheTrips(){

cache["trips"]=trips

}



function getCachedTrips(){

return cache["trips"] || []

}



/* =====================================================
LOGGING
===================================================== */

function logAction(type,data){

console.log(`[TAXI_MODEL] ${type}`,data.id)

}



/* =====================================================
EXPORTS
===================================================== */

module.exports={

TaxiTrip,

getAllTrips,
getTripById,
addTrip,
updateTrip,
deleteTrip,

calculateFare,
calculateSurge,

filterByCity,
filterNightTrips,

sortByFareAsc,
sortByFareDesc,

getAverageFare,
getLongestTrip,
getShortestTrip,
getCityTripStats,

detectTaxiScam,

cacheTrips,
getCachedTrips

}