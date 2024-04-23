const{Schema, model} = require("mongoose");

const vehiclesSchema = new Schema ({
    make: {type: String},
    model: {type: String},
});

const Vehicle = model("vehicles", vehiclesSchema);
module.exports = {Vehicle};