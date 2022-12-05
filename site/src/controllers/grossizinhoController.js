var grossizinhoModel = require("../models/grossizinhoModel");

function pegarRegistroInstancia(req, res){
    var idMaquina = req.query.idMaquina;
    grossizinhoModel.pegarRegistroInstancia(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registros da máquina.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function horasAtivas(req, res){
    const idMaquina = req.query.idMaquina;
    
    grossizinhoModel.horasAtivas(idMaquina)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma maquina encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function entradaEsaida(req, res){
    const idMaquina = req.query.idMaquina;
    
    grossizinhoModel.entradaEsaida(idMaquina)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma maquina encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}




module.exports = {
    horasAtivas,
    pegarRegistroInstancia,
    entradaEsaida,
 
    
}
