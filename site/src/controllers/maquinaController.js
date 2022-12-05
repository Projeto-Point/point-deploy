var maquinaModel = require("../models/maquinaModel");

// Página das máquinas
function listar(req, res) {
    const idEmpresa = req.query.idEmpresa;
    const ordenarPor = req.query.ordenarPor;
    console.log(ordenarPor)
    maquinaModel.listar(idEmpresa, ordenarPor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma máquina encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar as máquinas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// Página de alertas
function listarAlertas(req, res){
    const idEmpresa = req.query.idEmpresa;
    maquinaModel.listarAlertas(idEmpresa)
    .then(function(resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum alerta encontrado!");
        }
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

// Página da dashboard
function analiseComponente(req, res){
    const tipoComponente = req.query.tipoComponente;
    const idMaquina = req.query.idMaquina;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    const tipoVisualizacao = req.query.tipoVisualizacao;

    maquinaModel.analiseComponente(tipoComponente, idMaquina, dataInicio, dataFinal, tipoVisualizacao)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarTempo(req, res){
    const idMaquina = req.query.idMaquina;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    maquinaModel.pegarTempo(idMaquina, dataInicio, dataFinal)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarKpis(req, res){
    const idMaquina = req.query.idMaquina;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    maquinaModel.pegarKpis(idMaquina, dataInicio, dataFinal)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarAtividade(req, res){
    const idMaquina = req.query.idMaquina;
    maquinaModel.verificarAtividade(idMaquina)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarKpisRede(req, res){
    const idMaquina = req.query.idMaquina;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    maquinaModel.pegarKpisRede(idMaquina, dataInicio, dataFinal)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function analiseBytes(req, res){
    const idMaquina = req.query.idMaquina;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    const tipoVisualizacao = req.query.tipoVisualizacao;

    maquinaModel.analiseBytes(idMaquina, dataInicio, dataFinal, tipoVisualizacao)
    .then((resultado) => {
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function analiseBytes2(req, res){
    const idMaquina = req.query.idMaquina;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    const tipoVisualizacao = req.query.tipoVisualizacao;

    maquinaModel.analiseBytes2(idMaquina, dataInicio, dataFinal, tipoVisualizacao)
    .then((resultado) => {
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("Nenhum registro encontrado!");
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    listar,
    listarAlertas,
    analiseComponente,
    pegarTempo,
    pegarKpis,
    verificarAtividade,
    pegarKpisRede,
    analiseBytes,
    analiseBytes2
    
}