const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({

shopName:{
type:String,
required:true
},

location:{
type:String,
required:true
},

rating:{
type:Number,
default:4
},

verified:{
type:Boolean,
default:false
}

});

module.exports = mongoose.model("Vendor",vendorSchema);