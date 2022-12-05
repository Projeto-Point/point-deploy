var express = require("express");
var router = express.Router();

var ivanController = require("../controllers/ivanController");


router.get("/getLocalizacao", function (req, res) {
    ivanController.getLocalizacao(req, res);
});

router.get("/getCidades", function(req, res){
    ivanController.getCidades(req,res);
});

module.exports = router;
