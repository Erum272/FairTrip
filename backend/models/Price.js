const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({

productName:{
type:String,
required:true
},

averagePrice:{
type:Number,
required:true
},

currency:{
type:String,
default:"INR"
},

location:{
type:String,
default:"India"
}

});

module.exports = mongoose.model("Price",priceSchema);