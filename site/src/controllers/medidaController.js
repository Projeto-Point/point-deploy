var medidaModel = require("../models/medidaModel");

function pegarRegistroCPU(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroCPU(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registroCPUs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRegistroDISCO(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroDISCO(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registroDISCO.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRegistroRAM(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroRAM(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registroRAM.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRegistroFuncionario(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroFuncionario(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registroINFO.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRegistroMaquina(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroMaquina(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registros da máquina.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRegistroDownload(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroDownload(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os registroDownloads.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRegistroUpload(req, res){
    var idMaquina = req.query.idMaquina;
    medidaModel.pegarRegistroUpload(idMaquina)
    .then(function (resposta) {
        res.status(200).json(resposta);
    })
    .catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os pegarRegistroUploads.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegarRegistroCPU,
    pegarRegistroDISCO,
    pegarRegistroRAM,
    pegarRegistroFuncionario,
    pegarRegistroMaquina,
    pegarRegistroDownload,
    pegarRegistroUpload
    
}