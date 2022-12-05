var express = require("express");
var router = express.Router();

var grossizinhoController = require("../controllers/grossizinhoController");

router.get("/pegarRegistroInstancia", function(req, res){ 
    grossizinhoController.pegarRegistroInstancia(req, res);
});

router.get("/horasAtivas", function (req, res) {
    grossizinhoController.horasAtivas(req, res);
});

router.get("/entradaEsaida", function (req, res) {
    grossizinhoController.entradaEsaida(req, res);
});



// router.get("/pegarTempo", function(req, res){
//     grossizinhoController.pegarTempo(req, res);
// });
module.exports = router;