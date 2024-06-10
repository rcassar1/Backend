const { Vehicle } = require("../models/vehicles");
const StringValidationHelper = require("../helpers/string_validation_helper");
const { error } = require("console");
const { response } = require("../app");
const Dao = Vehicle;
const validationHelper = new StringValidationHelper();
class VehicleService {
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
  
  async create(vehicle) {
    var validation = this.validation(vehicle);
    if (validation.valid) {
      await Dao.create(vehicle);
      return { success: true };
    } else {
      return { success: false, message: validation.message };
    }
  }
  async update(vehicle) {
    var validation = this.validation(vehicle);
    if (validation.valid) {
      var updateResult = await Dao.updateOne(
        {
          _id: vehicle._id,
        },
        {
          make: vehicle.make,
          model: vehicle.model,
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

    async getFeaturedItems() {
      const featuredItems = await Vehicle.find({ featured: true });
      return featuredItems;
    };
  


  validation(vehicle) {
    var result = { valid: false, message: "" };
    var errors = [];
    if (vehicle.make.length < 1) {
      errors.push("Vehicle make is too short");
    }
    if (vehicle.model < 1) {
      errors.push("Vehicle model is too short");
    }

    var temp = validationHelper.validate(vehicle.make);
    if (temp.length != 0) {
      errors = error.concat("make: " + temp);
    }
    var temp = validationHelper.validate(vehicle.make);
    if (temp.length != 0) {
      errors = error.concat("model: " + temp);
    }
    if (errors.length > 0) {
      result.message = errors.join(",\r\n ");
      return result;
    } else return { valid: true };
  }
}
module.exports = VehicleService;
