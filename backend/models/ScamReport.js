const mongoose = require("mongoose");

const scamSchema = new mongoose.Schema({

location:{
type:String,
required:true
},

description:{
type:String,
required:true
},

reportedBy:{
type:String,
default:"Anonymous"
},

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("ScamReport",scamSchema);