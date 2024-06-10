
const{Schema, model} = require("mongoose");

const usersSchema = new Schema ({
    name: {type: String},
    lastName: {type: String},
    address:{type: String},
    email: {type: String},
    password: {type: String},
    isAdmin: {type: Boolean},

    
});

const Users = model("users", usersSchema);
module.exports = {Users};