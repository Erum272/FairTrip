/* =====================================================
FAIRTRIP PRICE MODEL
Advanced Tourist Price Intelligence Model
===================================================== */

const crypto = require("crypto")

/* =====================================================
CLASS DEFINITION
===================================================== */

class Price {

constructor(id,item,price,currency,city,category,source="manual"){

this.id=id
this.item=item
this.price=price
this.currency=currency
this.city=city
this.category=category
this.source=source

this.createdAt=new Date()
this.updatedAt=new Date()

this.hash=this.generateHash()

}

/* =========================================
HASH GENERATOR
========================================= */

generateHash(){

return crypto.createHash("sha256")
.update(this.item + this.city + this.price)
.digest("hex")

}

/* =========================================
UPDATE
========================================= */

update(data){

if(data.price) this.price=data.price
if(data.city) this.city=data.city
if(data.category) this.category=data.category
if(data.currency) this.currency=data.currency

this.updatedAt=new Date()

}

}



/* =====================================================
IN-MEMORY DATABASE
===================================================== */

let priceDatabase=[

new Price(1,"Water Bottle",20,"INR","Delhi","Food"),
new Price(2,"Coffee",150,"INR","Delhi","Food"),
new Price(3,"Taxi Airport",600,"INR","Delhi","Transport"),
new Price(4,"Street Snack",50,"INR","Mumbai","Food"),
new Price(5,"Museum Ticket",500,"INR","Delhi","Entertainment")

]



/* =====================================================
VALIDATION
===================================================== */

function validatePrice(data){

if(!data.item) return "Item required"
if(!data.price) return "Price required"
if(!data.city) return "City required"
if(!data.currency) return "Currency required"

return null

}



/* =====================================================
CRUD METHODS
===================================================== */

function getAllPrices(){

return priceDatabase

}



function getPriceById(id){

return priceDatabase.find(p=>p.id===id)

}



function searchPrice(item){

return priceDatabase.filter(p=>

p.item.toLowerCase().includes(item.toLowerCase())

)

}



function addPrice(data){

let error=validatePrice(data)

if(error) throw new Error(error)

let id=priceDatabase.length+1

let price=new Price(

id,
data.item,
data.price,
data.currency,
data.city,
data.category || "General"

)

priceDatabase.push(price)

logAction("ADD_PRICE",price)

return price

}



function updatePrice(id,data){

let price=getPriceById(id)

if(!price) return null

price.update(data)

logAction("UPDATE_PRICE",price)

return price

}



function deletePrice(id){

let index=priceDatabase.findIndex(p=>p.id===id)

if(index===-1) return false

let removed=priceDatabase.splice(index,1)

logAction("DELETE_PRICE",removed[0])

return true

}



/* =====================================================
BULK OPERATIONS
===================================================== */

function bulkInsert(list){

list.forEach(item=>{

addPrice(item)

})

return true

}



function bulkDelete(ids){

ids.forEach(id=>{

deletePrice(id)

})

return true

}



/* =====================================================
FILTERING
===================================================== */

function filterByCity(city){

return priceDatabase.filter(p=>p.city===city)

}



function filterByCategory(category){

return priceDatabase.filter(p=>p.category===category)

}



/* =====================================================
SORTING
===================================================== */

function sortByPriceAsc(){

return [...priceDatabase].sort((a,b)=>a.price-b.price)

}



function sortByPriceDesc(){

return [...priceDatabase].sort((a,b)=>b.price-a.price)

}



/* =====================================================
ANALYTICS
===================================================== */

function getAveragePrice(){

let total=priceDatabase.reduce((sum,p)=>sum+p.price,0)

return total/priceDatabase.length

}



function getMaxPrice(){

return Math.max(...priceDatabase.map(p=>p.price))

}



function getMinPrice(){

return Math.min(...priceDatabase.map(p=>p.price))

}



function getCategoryStats(){

let stats={}

priceDatabase.forEach(p=>{

if(!stats[p.category]) stats[p.category]=0

stats[p.category]++

})

return stats

}



function getCityStats(){

let stats={}

priceDatabase.forEach(p=>{

if(!stats[p.city]) stats[p.city]=0

stats[p.city]++

})

return stats

}



/* =====================================================
SCAM DETECTION
===================================================== */

function detectOverpriced(item,price){

let matches=searchPrice(item)

if(matches.length===0) return null

let avg=matches.reduce((s,p)=>s+p.price,0)/matches.length

if(price > avg*1.5){

return{

status:"OVERPRICED",

average:avg

}

}

return{

status:"FAIR",

average:avg

}

}



/* =====================================================
CACHE SYSTEM
===================================================== */

let cache={}

function cachePrices(){

cache["prices"]=priceDatabase

}



function getCachedPrices(){

return cache["prices"] || []

}



/* =====================================================
LOGGING
===================================================== */

function logAction(type,data){

console.log(`[PRICE_MODEL] ${type}`,data.id)

}



/* =====================================================
EXPORTS
===================================================== */

module.exports={

Price,

getAllPrices,
getPriceById,
searchPrice,

addPrice,
updatePrice,
deletePrice,

bulkInsert,
bulkDelete,

filterByCity,
filterByCategory,

sortByPriceAsc,
sortByPriceDesc,

getAveragePrice,
getMaxPrice,
getMinPrice,

getCategoryStats,
getCityStats,

detectOverpriced,

cachePrices,
getCachedPrices

}