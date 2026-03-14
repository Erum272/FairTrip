const db=require("../config/db")

function getVendors(){

return db.find("vendors")

}

function addVendor(data){

return db.insert("vendors",{

name:data.name,
city:data.city,
category:data.category,
rating:4,
reviews:[],
createdAt:new Date()

})

}

function addReview(id,review){

let vendor=db.findById("vendors",id)

if(!vendor) return null

vendor.reviews.push(review)

let avg=vendor.reviews.reduce((a,b)=>a+b.rating,0)/vendor.reviews.length

vendor.rating=avg

return vendor

}

module.exports={

getVendors,
addVendor,
addReview

}