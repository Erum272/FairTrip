/* =========================================
DATABASE CORE
========================================= */

const database = {

prices:[],
vendors:[],
taxiTrips:[],
scamReports:[],
logs:[]

}

/* =========================================
LOG SYSTEM
========================================= */

function log(action,collection){

database.logs.push({

action,
collection,
time:new Date()

})

}

/* =========================================
INSERT
========================================= */

function insert(collection,data){

if(!database[collection]){

throw new Error("Collection not found")

}

data.id=Date.now()+Math.random()

database[collection].push(data)

log("INSERT",collection)

return data

}

/* =========================================
FIND ALL
========================================= */

function find(collection){

if(!database[collection]){

throw new Error("Collection not found")

}

log("FIND",collection)

return database[collection]

}

/* =========================================
FIND BY ID
========================================= */

function findById(collection,id){

return database[collection].find(i=>i.id==id)

}

/* =========================================
UPDATE
========================================= */

function update(collection,id,data){

let item=findById(collection,id)

if(!item) return null

Object.keys(data).forEach(key=>{

item[key]=data[key]

})

log("UPDATE",collection)

return item

}

/* =========================================
DELETE
========================================= */

function remove(collection,id){

let index=database[collection].findIndex(i=>i.id==id)

if(index===-1) return false

database[collection].splice(index,1)

log("DELETE",collection)

return true

}

/* =========================================
EXPORT
========================================= */

module.exports={

database,
insert,
find,
findById,
update,
remove

}