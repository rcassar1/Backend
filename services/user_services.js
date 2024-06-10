const { Users } = require("../models/vehicles");
const StringValidationHelper = require("../helpers/string_validation_helper");
const { error } = require("console");
const { response } = require("../app");
const { use } = require("../routes");
const Dao = Users;
const validationHelper = new StringValidationHelper();
class UserService {

  async findById(id) {
    return await Dao.findById(id);
  }

  async count(){
    var response = Dao.length;
    return Dao.length;
  }

  async get(skip, take) {
    var temp = await Dao.find({}).skip(skip).limit(take);
    return temp;
  }
  
  async create(user) {
    var validation = this.validation(vehicle);
    if (validation.valid) {
      await Dao.create(user);
      return { success: true };
    } else {
      return { success: false, message: validation.message };
    }
  }
  async update(user) {
    var validation = this.validation(user);
    if (validation.valid) {
      var updateResult = await Dao.updateOne(
        {
          _id: user._id,
        },
        {
          name: user.name,
          lastName: user.lastName,
          address: user.address,
          email: user.email,
          password: user.password,
        }
      );
      if (updateResult.acknowledged == false) {
        return {
          success: false,
          message: "Something went wrong",
        };
      }
      return { success: true };
    } else {
      return { success: false, message: validation.message };
    }
  }

  async delete(id) {
             var deleteResult = await Dao.deleteOne({_id: id})
      if (deleteResult.acknowledged == false) {
        return{
          success: false,
          message: "Something went south",
        };
      } else {
        return {success: false };
        
      }

    };


  validation(user) {
    var result = { valid: false, message: "" };
    var errors = [];
    if (user.name.length < 1) {
      errors.push("Name is too short");
    }
    if (user.lastName < 1) {
      errors.push("Last Name is too short");
    }

    var temp = validationHelper.validate(user.name);
    if (temp.length != 0) {
      errors = error.concat("name: " + temp);
    }
    var temp = validationHelper.validate(user.lastName);
    if (temp.length != 0) {
      errors = error.concat("lastName: " + temp);
    }
    if (errors.length > 0) {
      result.message = errors.join(",\r\n ");
      return result;
    } else return { valid: true };
  }
}
module.exports = UserService;
