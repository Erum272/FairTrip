const db=require("../config/db")

function calculateFare(distance){

const base=50
const perKm=12

return base + distance*perKm

}

function addTrip(data){

let fare=calculateFare(data.distance)

return db.insert("taxiTrips",{

start:data.start,
end:data.end,
distance:data.distance,
fare,
createdAt:new Date()

})

}

function getTrips(){

return db.find("taxiTrips")

}

module.exports={

calculateFare,
addTrip,
getTrips

}