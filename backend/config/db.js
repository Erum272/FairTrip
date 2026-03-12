/* =====================================================
DATABASE CORE
SafeTour Backend Database Layer
===================================================== */

const crypto = require("crypto")

/* =====================================================
DATABASE OBJECT
===================================================== */

const database = {

prices: [],
vendors: [],
taxiFares: [],
scamReports: [],

logs: [],
cache: {},

stats: {
totalQueries:0,
reads:0,
writes:0
}

}



/* =====================================================
UTILITY FUNCTIONS
===================================================== */

function generateId(){

return crypto.randomBytes(6).toString("hex")

}

function log(action,collection){

database.logs.push({

action,
collection,
time:new Date()

})

database.stats.totalQueries++

}



/* =====================================================
INSERT
===================================================== */

function insert(collection,data){

if(!database[collection]){

throw new Error("Collection not found")

}

data.id = generateId()

database[collection].push(data)

database.stats.writes++

log("INSERT",collection)

return data

}



/* =====================================================
FIND ALL
===================================================== */

function find(collection){

if(!database[collection]){

throw new Error("Collection not found")

}

database.stats.reads++

log("FIND_ALL",collection)

return database[collection]

}



/* =====================================================
FIND BY ID
===================================================== */

function findById(collection,id){

if(!database[collection]){

throw new Error("Collection not found")

}

let item = database[collection].find(i=>i.id===id)

database.stats.reads++

log("FIND_ID",collection)

return item

}



/* =====================================================
UPDATE
===================================================== */

function update(collection,id,data){

let item = findById(collection,id)

if(!item) return null

Object.keys(data).forEach(key=>{

item[key]=data[key]

})

database.stats.writes++

log("UPDATE",collection)

return item

}



/* =====================================================
DELETE
===================================================== */

function remove(collection,id){

let index = database[collection].findIndex(i=>i.id===id)

if(index===-1) return false

database[collection].splice(index,1)

database.stats.writes++

log("DELETE",collection)

return true

}



/* =====================================================
SEARCH
===================================================== */

function search(collection,field,value){

let results = database[collection].filter(item=>{

return item[field] && item[field]
.toString()
.toLowerCase()
.includes(value.toLowerCase())

})

database.stats.reads++

log("SEARCH",collection)

return results

}



/* =====================================================
FILTER
===================================================== */

function filter(collection,field,value){

let results = database[collection].filter(item=>item[field]===value)

database.stats.reads++

log("FILTER",collection)

return results

}



/* =====================================================
CACHE SYSTEM
===================================================== */

function setCache(key,data){

database.cache[key] = {

data,
time:new Date()

}

}

function getCache(key){

return database.cache[key]?.data || null

}



/* =====================================================
ANALYTICS
===================================================== */

function getStats(){

return {

collections:{
prices:database.prices.length,
vendors:database.vendors.length,
taxiFares:database.taxiFares.length,
scamReports:database.scamReports.length
},

queries:database.stats

}

}



/* =====================================================
RESET DATABASE
===================================================== */

function resetDatabase(){

database.prices=[]
database.vendors=[]
database.taxiFares=[]
database.scamReports=[]

database.logs=[]
database.cache={}

database.stats={
totalQueries:0,
reads:0,
writes:0
}

}



/* =====================================================
SEED SAMPLE DATA
===================================================== */

function seed(){

insert("prices",{

item:"Water Bottle",
price:20,
city:"Delhi"

})

insert("vendors",{

name:"Delhi Souvenir Shop",
city:"Delhi",
rating:4.5

})

insert("taxiFares",{

route:"Airport to City",
price:600,
city:"Delhi"

})

insert("scamReports",{

title:"Fake Taxi",
city:"Delhi",
severity:"High"

})

}



/* =====================================================
EXPORT MODULE
===================================================== */

module.exports = {

database,

insert,
find,
findById,
update,
remove,

search,
filter,

setCache,
getCache,

getStats,
resetDatabase,
seed

}