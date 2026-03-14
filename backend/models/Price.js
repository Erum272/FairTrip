const db=require("../config/db")

function getPrices(){

return db.find("prices")

}

function addPrice(data){

return db.insert("prices",{

item:data.item,
price:data.price,
city:data.city,
category:data.category,
createdAt:new Date()

})

}

function getPrice(id){

return db.findById("prices",id)

}

function updatePrice(id,data){

return db.update("prices",id,data)

}

function deletePrice(id){

return db.remove("prices",id)

}

function searchPrice(keyword){

let prices=getPrices()

return prices.filter(p=>

p.item.toLowerCase().includes(keyword.toLowerCase())

)

}

function filterByCity(city){

return getPrices().filter(p=>p.city===city)

}

module.exports={

getPrices,
addPrice,
getPrice,
updatePrice,
deletePrice,
searchPrice,
filterByCity

}