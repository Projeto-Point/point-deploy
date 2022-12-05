var gabrielModel = require("../models/gabrielModel");

function listarProcessos(req, res) {
    const idMaquina = req.query.idMaquina;
    gabrielModel.listarProcessos(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum processo encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarProcessos
}