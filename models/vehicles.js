const{Schema, model} = require("mongoose");

const vehiclesSchema = new Schema ({
    make: {type: String},
    model: {type: String},
    kms: {type: Number},
    colour: {type: String},
    featured: {type: Boolean},
    PhotoUrl: {type:String},
    price: {type: Number},
    year: {type: Number},
});

const Vehicle = model("vehicles", vehiclesSchema);
module.exports = {Vehicle};