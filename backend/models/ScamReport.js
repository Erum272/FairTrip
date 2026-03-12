/* =====================================================
SCAM ROUTES
Tourist Safety Intelligence API
===================================================== */

const express = require("express")
const router = express.Router()

const {

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

} = require("../models/ScamReportModel")



/* =====================================================
GET ALL REPORTS
===================================================== */

router.get("/",(req,res)=>{

try{

let reports = getAllReports()

res.json({

status:"success",
count:reports.length,
data:reports

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
GET REPORT BY ID
===================================================== */

router.get("/:id",(req,res)=>{

try{

let id=parseInt(req.params.id)

let report=getReportById(id)

if(!report){

return res.status(404).json({

status:"fail",
message:"Report not found"

})

}

res.json({

status:"success",
data:report

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
ADD SCAM REPORT
===================================================== */

router.post("/",(req,res)=>{

try{

let report=addReport(req.body)

res.status(201).json({

status:"success",
message:"Scam report created",
data:report

})

}catch(err){

res.status(400).json({

status:"fail",
message:err.message

})

}

})



/* =====================================================
UPDATE REPORT
===================================================== */

router.put("/:id",(req,res)=>{

try{

let id=parseInt(req.params.id)

let report=updateReport(id,req.body)

if(!report){

return res.status(404).json({

status:"fail",
message:"Report not found"

})

}

res.json({

status:"success",
message:"Report updated",
data:report

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
DELETE REPORT
===================================================== */

router.delete("/:id",(req,res)=>{

try{

let id=parseInt(req.params.id)

let success=deleteReport(id)

if(!success){

return res.status(404).json({

status:"fail",
message:"Report not found"

})

}

res.json({

status:"success",
message:"Report deleted"

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
SEARCH REPORTS
===================================================== */

router.get("/search/:keyword",(req,res)=>{

try{

let keyword=req.params.keyword

let results=searchReports(keyword)

res.json({

status:"success",
results:results.length,
data:results

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
FILTER BY CITY
===================================================== */

router.get("/city/:city",(req,res)=>{

try{

let city=req.params.city

let reports=filterByCity(city)

res.json({

status:"success",
city:city,
reports:reports.length,
data:reports

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
FILTER BY TYPE
===================================================== */

router.get("/type/:type",(req,res)=>{

try{

let type=req.params.type

let reports=filterByType(type)

res.json({

status:"success",
type:type,
reports:reports.length,
data:reports

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
HIGH SEVERITY ALERTS
===================================================== */

router.get("/alerts/high",(req,res)=>{

try{

let alerts=filterHighSeverity()

res.json({

status:"success",
alerts:alerts.length,
data:alerts

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
HOTSPOT DETECTION
===================================================== */

router.get("/analytics/hotspots",(req,res)=>{

try{

let hotspots=detectHotspots()

res.json({

status:"success",
hotspots

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
CITY STATS
===================================================== */

router.get("/analytics/city-stats",(req,res)=>{

try{

let stats=getCityStats()

res.json({

status:"success",
data:stats

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
TYPE STATS
===================================================== */

router.get("/analytics/type-stats",(req,res)=>{

try{

let stats=getTypeStats()

res.json({

status:"success",
data:stats

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
TOTAL REPORT COUNT
===================================================== */

router.get("/analytics/total",(req,res)=>{

try{

let total=getTotalReports()

res.json({

status:"success",
totalReports:total

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
AI SCAM KEYWORD DETECTION
===================================================== */

router.post("/ai/detect",(req,res)=>{

try{

let text=req.body.text

let keywords=detectScamKeywords(text)

res.json({

status:"success",
detectedKeywords:keywords

})

}catch(err){

res.status(500).json({

status:"error",
message:err.message

})

}

})



/* =====================================================
CACHE REPORTS
===================================================== */

router.get("/cache/store",(req,res)=>{

cacheReports()

res.json({

status:"success",
message:"Reports cached successfully"

})

})



/* =====================================================
GET CACHE
===================================================== */

router.get("/cache",(req,res)=>{

let data=getCachedReports()

res.json({

status:"success",
cachedReports:data.length,
data:data

})

})



/* =====================================================
EXPORT ROUTER
===================================================== */

module.exports = router