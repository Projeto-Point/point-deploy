var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listar", function (req, res) {
    maquinaController.listar(req, res);
});

router.get("/listarAlertas", function(req, res){
    maquinaController.listarAlertas(req, res);
});

router.get("/analiseComponente", function(req, res){
    maquinaController.analiseComponente(req, res);
});

router.get("/pegarTempo", function(req, res){
    maquinaController.pegarTempo(req, res);
});

router.get("/pegarKpis", function(req, res){
    maquinaController.pegarKpis(req, res);
});

router.get("/verificarAtividade", function(req, res){
    maquinaController.verificarAtividade(req, res);
});

router.get("/pegarKpisRede", function(req, res){
    maquinaController.pegarKpisRede(req, res);
});

router.get("/analiseBytes", function(req, res){
    maquinaController.analiseBytes(req, res);
});

router.get("/analiseBytes2", function(req, res){
    maquinaController.analiseBytes2(req, res);
});


module.exports = router;