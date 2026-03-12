/* =====================================================
FAIRTRIP VENDOR MODEL
Trusted Vendor Intelligence System
===================================================== */

const crypto = require("crypto")

/* =====================================================
CLASS DEFINITION
===================================================== */

class Vendor {

constructor(id,name,city,category,rating=4,verified=false){

this.id=id
this.name=name
this.city=city
this.category=category

this.rating=rating
this.verified=verified

this.reviews=[]
this.totalReviews=0

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
.update(this.name + this.city)
.digest("hex")

}

/* =========================================
UPDATE
========================================= */

update(data){

if(data.name) this.name=data.name
if(data.city) this.city=data.city
if(data.category) this.category=data.category
if(data.rating) this.rating=data.rating

this.updatedAt=new Date()

}

/* =========================================
ADD REVIEW
========================================= */

addReview(user,rating,comment){

let review={

user,
rating,
comment,
date:new Date()

}

this.reviews.push(review)

this.totalReviews++

this.updateRating()

}

/* =========================================
RATING CALCULATION
========================================= */

updateRating(){

if(this.reviews.length===0) return

let total=this.reviews.reduce((sum,r)=>sum+r.rating,0)

this.rating = total / this.reviews.length

}

}



/* =====================================================
DATABASE
===================================================== */

let vendors=[

new Vendor(1,"Delhi Souvenir Shop","Delhi","Shopping",4.5,true),
new Vendor(2,"Bangkok Street Market","Bangkok","Shopping",4.2,true),
new Vendor(3,"Paris Handicrafts","Paris","Shopping",4.8,true),
new Vendor(4,"Rome Food Plaza","Rome","Food",4.3,true)

]



/* =====================================================
VALIDATION
===================================================== */

function validateVendor(data){

if(!data.name) return "Vendor name required"
if(!data.city) return "City required"
if(!data.category) return "Category required"

return null

}



/* =====================================================
CRUD OPERATIONS
===================================================== */

function getAllVendors(){

return vendors

}

function getVendorById(id){

return vendors.find(v=>v.id===id)

}

function addVendor(data){

let error=validateVendor(data)

if(error) throw new Error(error)

let id=vendors.length+1

let vendor=new Vendor(

id,
data.name,
data.city,
data.category,
data.rating || 4,
data.verified || false

)

vendors.push(vendor)

logAction("ADD_VENDOR",vendor)

return vendor

}

function updateVendor(id,data){

let vendor=getVendorById(id)

if(!vendor) return null

vendor.update(data)

logAction("UPDATE_VENDOR",vendor)

return vendor

}

function deleteVendor(id){

let index=vendors.findIndex(v=>v.id===id)

if(index===-1) return false

let removed=vendors.splice(index,1)

logAction("DELETE_VENDOR",removed[0])

return true

}



/* =====================================================
SEARCH
===================================================== */

function searchVendor(name){

return vendors.filter(v=>

v.name.toLowerCase().includes(name.toLowerCase())

)

}



/* =====================================================
FILTERING
===================================================== */

function filterByCity(city){

return vendors.filter(v=>v.city===city)

}

function filterByCategory(category){

return vendors.filter(v=>v.category===category)

}

function filterVerified(){

return vendors.filter(v=>v.verified===true)

}



/* =====================================================
SORTING
===================================================== */

function sortByRating(){

return [...vendors].sort((a,b)=>b.rating-a.rating)

}

function sortByReviews(){

return [...vendors].sort((a,b)=>b.totalReviews-a.totalReviews)

}



/* =====================================================
REVIEWS
===================================================== */

function addVendorReview(id,user,rating,comment){

let vendor=getVendorById(id)

if(!vendor) return null

vendor.addReview(user,rating,comment)

logAction("ADD_REVIEW",vendor)

return vendor

}

function getVendorReviews(id){

let vendor=getVendorById(id)

if(!vendor) return []

return vendor.reviews

}



/* =====================================================
ANALYTICS
===================================================== */

function getVendorStats(){

let total=vendors.length

let verified=vendors.filter(v=>v.verified).length

let avgRating=vendors.reduce((sum,v)=>sum+v.rating,0)/vendors.length

return{

totalVendors:total,
verifiedVendors:verified,
averageRating:avgRating

}

}

function getCityVendorStats(){

let stats={}

vendors.forEach(v=>{

if(!stats[v.city]) stats[v.city]=0

stats[v.city]++

})

return stats

}

function getTopVendors(limit=5){

return sortByRating().slice(0,limit)

}



/* =====================================================
SCAM DETECTION
===================================================== */

function detectSuspiciousVendor(vendor){

if(vendor.rating < 2){

return{

status:"SUSPICIOUS",

reason:"Very low rating"

}

}

if(vendor.totalReviews > 50 && vendor.rating > 4.9){

return{

status:"CHECK",

reason:"Unusual rating pattern"

}

}

return{

status:"SAFE"

}

}



/* =====================================================
CACHE SYSTEM
===================================================== */

let cache={}

function cacheVendors(){

cache["vendors"]=vendors

}

function getCachedVendors(){

return cache["vendors"] || []

}



/* =====================================================
LOGGING
===================================================== */

function logAction(type,data){

console.log(`[VENDOR_MODEL] ${type}`,data.id)

}



/* =====================================================
EXPORTS
===================================================== */

module.exports={

Vendor,

getAllVendors,
getVendorById,
addVendor,
updateVendor,
deleteVendor,

searchVendor,

filterByCity,
filterByCategory,
filterVerified,

sortByRating,
sortByReviews,

addVendorReview,
getVendorReviews,

getVendorStats,
getCityVendorStats,
getTopVendors,

detectSuspiciousVendor,

cacheVendors,
getCachedVendors

}