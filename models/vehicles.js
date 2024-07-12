const{Schema, model} = require("mongoose");
const { ObjectId } = require("mongoose/lib/types");
 

const vehiclesSchema = new Schema ({
    make: {type: String},
    model: {type: String},
    kms: {type: Number},
    colour: {type: String},
    featured: {type: Boolean},
    photoUrl: {type:String},
    price: {type: Number},
    year: {type: Number},
});

const Vehicle = model("vehicles", vehiclesSchema);
module.exports = {Vehicle};