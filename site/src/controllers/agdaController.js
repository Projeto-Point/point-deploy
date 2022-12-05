var agdaModel = require("../models/agdaModel");

// Página das máquinas
function pegarMovimentacao(req, res) {
    const acao = req.query.acao;
    const periodoInicio = req.query.periodoInicio;
    const periodoFim = req.query.periodoFim;
    const idFuncionario = req.query.idFuncionario;
    const cidade = req.query.cidade;
    const idEmpresa = req.query.idEmpresa;
    agdaModel.pegarMovimentacao(acao, periodoInicio, periodoFim, idFuncionario, cidade, idEmpresa)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma entrada encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a movimentação: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarProcessos(req, res) {
    const periodoInicio = req.query.periodoInicio;
    const periodoFim = req.query.periodoFim;
    const idFuncionario = req.query.idFuncionario;
    const cidade = req.query.cidade;
    const idEmpresa = req.query.idEmpresa;
    agdaModel.pegarProcessos(periodoInicio, periodoFim, idFuncionario, cidade, idEmpresa)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhum processo encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a quantidade de processos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarCpu(req, res) {
    const periodoInicio = req.query.periodoInicio;
    const periodoFim = req.query.periodoFim;
    const idFuncionario = req.query.idFuncionario;
    const cidade = req.query.cidade;
    const idEmpresa = req.query.idEmpresa;
    agdaModel.pegarCpu(periodoInicio, periodoFim, idFuncionario, cidade, idEmpresa)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma CPU encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarRam(req, res) {
    const periodoInicio = req.query.periodoInicio;
    const periodoFim = req.query.periodoFim;
    const idFuncionario = req.query.idFuncionario;
    const cidade = req.query.cidade;
    const idEmpresa = req.query.idEmpresa;
    agdaModel.pegarRam(periodoInicio, periodoFim, idFuncionario, cidade, idEmpresa)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma CPU encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarFuncionarios(req, res){
    const idEmpresa = req.query.idEmpresa;
    const cidade = req.query.cidade;
    agdaModel.pegarFuncionarios(idEmpresa, cidade)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhum funcionário encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function mediaHorasAtivas(req, res){
    const idFuncionario = req.query.idFuncionario;
    const dataInicio = req.query.dataInicio;
    const dataFinal = req.query.dataFinal;
    const cidade = req.query.cidade;
    const idEmpresa = req.query.idEmpresa;
    agdaModel.mediaHorasAtivas(idFuncionario, dataInicio, dataFinal, cidade, idEmpresa)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhum funcionário encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarCidades(req, res){
    const idEmpresa = req.query.idEmpresa;
    agdaModel.pegarCidades(idEmpresa)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nenhuma cidade encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar a CPU: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function sobreFuncionario(req, res){
    const idFuncionario = req.query.idFuncionario;
    agdaModel.sobreFuncionario(idFuncionario)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Nada sobre o funcionário!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao pegar info do funcionário: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegarMovimentacao,
    pegarProcessos,
    pegarCpu,
    pegarRam,
    pegarFuncionarios,
    mediaHorasAtivas,
    pegarCidades,
    sobreFuncionario,
}