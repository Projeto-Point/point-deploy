var express = require("express");
var router = express.Router();

var gabrielController = require("../controllers/gabrielController");

router.get("/listarProcessos", function(req, res){ 
    gabrielController.listarProcessos(req, res);
});



module.exports = router;