var express = require('express');
var router = express.Router();

const userService = require("../services/user_services");
const {response} = require("../app");
const {User} = require("../models/users");
const service = new userService();



/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/adduser", async function(req, res) {
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




module.exports = router;
