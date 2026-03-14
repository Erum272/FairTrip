const prices = []

function getPrices(){
return prices
}

function addPrice(data){

const price={
id:Date.now(),
item:data.item,
price:data.price,
city:data.city,
category:data.category,
createdAt:new Date()
}

prices.push(price)

return price
}

function getPriceById(id){

return prices.find(p=>p.id==id)

}

function updatePrice(id,data){

const price=getPriceById(id)

if(!price) return null

price.price=data.price || price.price
price.city=data.city || price.city
price.category=data.category || price.category

return price
}

function deletePrice(id){

const index=prices.findIndex(p=>p.id==id)

if(index===-1) return false

prices.splice(index,1)

return true
}

module.exports={
getPrices,
addPrice,
getPriceById,
updatePrice,
deletePrice
}