var ivanModel = require("../models/ivanModel");


function getLocalizacao(req, res) {

    const idEmpresa = req.query.idEmpresa;
    const filtro = req.query.filtroMapa;
    
    ivanModel.getLocalizacao(idEmpresa, filtro)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma localização encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Erro no SQL: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getCidades(req, res){

    const idEmpresa = req.query.idEmpresa;

    ivanModel.getCidades(idEmpresa)
    .then(function (resultado){

        if(resultado.length > 0) {

            res.status(200).json(resultado);

        }
        else{
            res.status(204).send("Nenhuma cidade encontrada")
        }
    }).catch(function(erro){

        console.log(erro)
        console.log("Mysql ERRO: ",erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)

    });

}


module.exports = {
    getLocalizacao,
    getCidades

}