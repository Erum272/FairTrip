const vendors=[]

function getVendors(){
return vendors
}

function addVendor(data){

const vendor={
id:Date.now(),
name:data.name,
city:data.city,
category:data.category,
rating:4,
createdAt:new Date()
}

vendors.push(vendor)

return vendor
}

function getVendorById(id){
return vendors.find(v=>v.id==id)
}

module.exports={
getVendors,
addVendor,
getVendorById
}