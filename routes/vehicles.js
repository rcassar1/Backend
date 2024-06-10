var express = require("express");
const { builtinModules } = require("module");
var router = express.Router();

const vehicleService = require("../services/vehicle_services");
const {response} = require("../app");
const { Vehicle } = require("../models/vehicles");
const service = new vehicleService();

/* GET users listing */
router.get("/id/:id", async function (req, res, next) {
    var id = req.params["id"];
    var response = await service.findById(id);
    if (response != null) {
        res.send(200, response);
    } else {
        res.send(404); 
    }
});


router.get("/getall", async function (req, res, next) {
    var skip = req.query["s"];
    var take = req.query["t"];
    req.header;
    var result = await service.get(skip, take);
    if (result != null && result.length > 0) {
        res.send(200, result);
    } else {
        res.send(416);        
    }
});


router.get("/count", async function (req, res) {
   var response =  await Vehicle.countDocuments();
    if (response != null) {
    res.send(200, response);
} else {
    res.send(404);
}
});


router.post("/add", async function(req, res) {
    var payload = req.body();
    var result = await service.create(payload);
    if (result.success) {
        res.send(201);
              
    } else {
        res.send(400, {
            message: result.message,
        });
    }
});

router.post("/update", async function(req, res) {
    var payload = req.body;
    var result = await service.update(payload);
    if (result.success) {
        res.send(201);
              
    } else {
        res.send(400, {
            message: result.message,
        });
    }
})

router.put("/:id", async function (req, res) {

});

router.delete("/delete/:id", async function (req, res, next) {
    var id = req.params["id"];
    var response = await service.delete(id);
    if (response != null) {
        res.send(200, response);
    } else {
        res.send(404); 
    }
});

router.get("/featured", async function (req, res, next) {
    var featured = req.params.featured;
    var response = await service.getFeaturedItems();

    if (response != null) {
        res.send(200, response);
    } else {
        res.send(404); 
    }
});


module.exports=router