/* =====================================================
FAIRTRIP SCAM REPORT MODEL
Tourist Scam Intelligence System
===================================================== */

const crypto = require("crypto")

/* =====================================================
SCAM REPORT CLASS
===================================================== */

class ScamReport {

constructor(id,title,description,location,city,type,severity){

this.id = id
this.title = title
this.description = description
this.location = location
this.city = city
this.type = type
this.severity = severity

this.createdAt = new Date()
this.updatedAt = new Date()

this.hash = this.generateHash()

}

/* =========================================
HASH
========================================= */

generateHash(){

return crypto
.createHash("sha256")
.update(this.title + this.location + this.city)
.digest("hex")

}

/* =========================================
UPDATE
========================================= */

update(data){

if(data.description) this.description = data.description
if(data.location) this.location = data.location
if(data.severity) this.severity = data.severity

this.updatedAt = new Date()

}

}



/* =====================================================
DATABASE
===================================================== */

let scamReports = [

new ScamReport(
1,
"Fake Taxi Scam",
"Driver charged 3x normal price",
"Airport",
"Delhi",
"Taxi",
"High"
),

new ScamReport(
2,
"Tourist Gift Shop Overpricing",
"Shop charged extremely high prices",
"Old Market",
"Bangkok",
"Shopping",
"Medium"
),

new ScamReport(
3,
"Fake Tour Guide",
"Person pretending to be official guide",
"Museum Area",
"Paris",
"Guide",
"High"
)

]



/* =====================================================
VALIDATION
===================================================== */

function validateReport(data){

if(!data.title) return "Title required"
if(!data.description) return "Description required"
if(!data.city) return "City required"

return null

}



/* =====================================================
CRUD
===================================================== */

function getAllReports(){

return scamReports

}



function getReportById(id){

return scamReports.find(r => r.id === id)

}



function addReport(data){

let error = validateReport(data)

if(error) throw new Error(error)

let id = scamReports.length + 1

let report = new ScamReport(

id,
data.title,
data.description,
data.location || "Unknown",
data.city,
data.type || "General",
data.severity || "Low"

)

scamReports.push(report)

logAction("ADD_REPORT",report)

return report

}



function updateReport(id,data){

let report = getReportById(id)

if(!report) return null

report.update(data)

logAction("UPDATE_REPORT",report)

return report

}



function deleteReport(id){

let index = scamReports.findIndex(r => r.id === id)

if(index === -1) return false

let removed = scamReports.splice(index,1)

logAction("DELETE_REPORT",removed[0])

return true

}



/* =====================================================
FILTERING
===================================================== */

function filterByCity(city){

return scamReports.filter(r => r.city === city)

}



function filterByType(type){

return scamReports.filter(r => r.type === type)

}



function filterHighSeverity(){

return scamReports.filter(r => r.severity === "High")

}



/* =====================================================
SEARCH
===================================================== */

function searchReports(keyword){

return scamReports.filter(r =>

r.title.toLowerCase().includes(keyword.toLowerCase()) ||
r.description.toLowerCase().includes(keyword.toLowerCase())

)

}



/* =====================================================
ANALYTICS
===================================================== */

function getCityStats(){

let stats = {}

scamReports.forEach(r => {

if(!stats[r.city]) stats[r.city] = 0

stats[r.city]++

})

return stats

}



function getTypeStats(){

let stats = {}

scamReports.forEach(r => {

if(!stats[r.type]) stats[r.type] = 0

stats[r.type]++

})

return stats

}



function getTotalReports(){

return scamReports.length

}



/* =====================================================
SCAM HOTSPOT DETECTION
===================================================== */

function detectHotspots(){

let cityStats = getCityStats()

let hotspots = []

for(let city in cityStats){

if(cityStats[city] >= 2){

hotspots.push({

city: city,
reports: cityStats[city]

})

}

}

return hotspots

}



/* =====================================================
AI KEYWORD DETECTION
===================================================== */

const scamKeywords = [

"overcharge",
"fake",
"scam",
"fraud",
"tourist trap",
"extra fee"

]

function detectScamKeywords(text){

let found = []

scamKeywords.forEach(k => {

if(text.toLowerCase().includes(k)){

found.push(k)

}

})

return found

}



/* =====================================================
CACHE
===================================================== */

let cache = {}

function cacheReports(){

cache["reports"] = scamReports

}



function getCachedReports(){

return cache["reports"] || []

}



/* =====================================================
LOGGING
===================================================== */

function logAction(type,data){

console.log(`[SCAM_MODEL] ${type}`, data.id)

}



/* =====================================================
EXPORTS
===================================================== */

module.exports = {

ScamReport,

getAllReports,
getReportById,
addReport,
updateReport,
deleteReport,

filterByCity,
filterByType,
filterHighSeverity,

searchReports,

getCityStats,
getTypeStats,
getTotalReports,

detectHotspots,
detectScamKeywords,

cacheReports,
getCachedReports

}