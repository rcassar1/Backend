var express = require("express");
const { builtinModules } = require("module");
var router = express.Router();

const vehicleService = require("../services/vehicle_services");
const {response} = require("../app");
const { Vehicle } = require("../models/vehicles");
const { ObjectId } = require("mongoose/lib/types");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'images/'); 
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const service = new vehicleService();

const upload = multer({ storage: storage });


router.post('/image', upload.single('photo'), async function(req, res) {

  try {
      const serverUrl = 'http://localhost:4000'
      let filePath = req.file ? req.file.path : null;
      let photoUrl = filePath ? `${serverUrl}/${filePath}` : null;
      res.status(201).json({photoUrl:photoUrl});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});


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
    
    var payload = req.body;
    var result = await service.create(payload);
    if (result.success) {
        res.send(201);
              
    } else {
        res.send(400, {
            message: result.message,
        });
    }
});

router.post("/update/:id", async function(req, res) {
    const { id } = req.params;
    var payload = req.body;
    const { make, model, kms, colour, featured } = payload

    const vehicle = await Vehicle.findById(id);
    if(!vehicle){
        return res.status(404).send({message: 'Vehicle not found'})
    }

    vehicle.make = make;
    vehicle.model = model;
    vehicle.kms = kms;
    vehicle.colour = colour;
    vehicle.featured = featured;
    var result = await vehicle.save();
    if (result.success) {
        res.send(201);
        console.log(result);
        console.log(payload);

              
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