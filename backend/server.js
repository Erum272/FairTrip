/* ======================================================
FAIRTRIP / SAFETOUR BACKEND SERVER
Express API Server
====================================================== */

const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")

/* ======================================================
IMPORT ROUTES
====================================================== */

const priceRoutes = require("./routes/priceRoutes")
const taxiRoutes = require("./routes/taxiRoutes")
const vendorRoutes = require("./routes/vendorRoutes")

/* ======================================================
CREATE EXPRESS APP
====================================================== */

const app = express()

/* ======================================================
SERVER CONFIG
====================================================== */

const PORT = process.env.PORT || 5000

/* ======================================================
MIDDLEWARE
====================================================== */

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:true}))

/* ======================================================
REQUEST LOGGER
====================================================== */

app.use((req,res,next)=>{

const time = new Date().toISOString()

console.log(`[${time}] ${req.method} ${req.url}`)

next()

})

/* ======================================================
STATIC FILES (OPTIONAL)
====================================================== */

app.use("/assets",express.static(path.join(__dirname,"../frontend/assets")))

/* ======================================================
API ROUTES
====================================================== */

app.use("/api/prices",priceRoutes)

app.use("/api/taxi",taxiRoutes)

app.use("/api/vendors",vendorRoutes)

/* ======================================================
ROOT ROUTE
====================================================== */

app.get("/",(req,res)=>{

res.json({

project:"FairTrip Tourist Safety API",

version:"1.0",

endpoints:{

prices:"/api/prices",

taxi:"/api/taxi",

vendors:"/api/vendors"

}

})

})

/* ======================================================
HEALTH CHECK
====================================================== */

app.get("/health",(req,res)=>{

res.json({

status:"OK",

uptime:process.uptime(),

timestamp:Date.now()

})

})

/* ======================================================
API DOCUMENTATION
====================================================== */

app.get("/docs",(req,res)=>{

res.json({

message:"API Documentation",

routes:[

"GET /api/prices",

"POST /api/prices/check",

"POST /api/prices/add",

"GET /api/prices/search",

"POST /api/taxi/estimate",

"POST /api/taxi/airport",

"GET /api/taxi/trips",

"GET /api/vendors",

"POST /api/vendors/add"

]

})

})

/* ======================================================
404 HANDLER
====================================================== */

app.use((req,res)=>{

res.status(404).json({

error:"Route not found"

})

})

/* ======================================================
GLOBAL ERROR HANDLER
====================================================== */

app.use((err,req,res,next)=>{

console.error("SERVER ERROR:",err)

res.status(500).json({

error:"Internal Server Error"

})

})

/* ======================================================
START SERVER
====================================================== */

app.listen(PORT,()=>{

console.log("====================================")
console.log("FairTrip API Server Running")
console.log("Port:",PORT)
console.log("Local: http://localhost:"+PORT)
console.log("====================================")

})