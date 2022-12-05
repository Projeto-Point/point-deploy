var database = require("../database/config");

function listar(idEmpresa, ordenarPor){
    let instrucaoSql;

    if(ordenarPor == "alerta"){
        instrucaoSql = `SELECT DISTINCT idMaquina, nomeMaquina, Funcionario.nome, tipo, (CASE WHEN resolucao LIKE 'ABERTO' THEN 'ABERTO' ELSE 'FECHADO' END) AS resolucao  FROM Maquina
        LEFT JOIN Alerta ON fkMaquina = idMaquina
        INNER JOIN Funcionario ON fkFuncionario = idFuncionario
        INNER JOIN Empresa on idEmpresa = [dbo].[Funcionario].fkEmpresa
        WHERE idEmpresa = ${idEmpresa}
        ORDER BY resolucao;`;
    }
    else if(ordenarPor == "maquina"){
        instrucaoSql =  instrucaoSql = `SELECT DISTINCT idMaquina, nomeMaquina, Funcionario.nome, tipo, (CASE WHEN resolucao LIKE 'ABERTO' THEN 'ABERTO' ELSE 'FECHADO' END) AS resolucao FROM Maquina
        LEFT JOIN Alerta ON fkMaquina = idMaquina
        INNER JOIN Funcionario ON fkFuncionario = idFuncionario
        INNER JOIN Empresa on idEmpresa = [dbo].[Funcionario].fkEmpresa
        WHERE idEmpresa = ${idEmpresa}
        ORDER BY nomeMaquina;`;
    }
    else if(ordenarPor == "funcionario"){
        instrucaoSql = instrucaoSql = `SELECT DISTINCT idMaquina, nomeMaquina, Funcionario.nome, tipo, (CASE WHEN resolucao LIKE 'ABERTO' THEN 'ABERTO' ELSE 'FECHADO' END) AS resolucao FROM Maquina
        LEFT JOIN Alerta ON fkMaquina = idMaquina
        INNER JOIN Funcionario ON fkFuncionario = idFuncionario
        INNER JOIN Empresa on idEmpresa = [dbo].[Funcionario].fkEmpresa
        WHERE idEmpresa = ${idEmpresa}
        ORDER BY Funcionario.nome;`;;
    }
    return database.executar(instrucaoSql);
}

function listarAlertas(idEmpresa){
    instrucaoSql = `SELECT * FROM vw_alertas where idEmpresa = ${idEmpresa} ORDER BY dataEhora;`;
    return database.executar(instrucaoSql);
}

function analiseComponente(tipoComponente, idMaquina, dataInicio, dataFinal, tipoVisualizacao = "dia"){
    if(tipoVisualizacao == "dia"){
        instrucaoSql = `SELECT CAST(dataEhora AS DATE) AS 'dataEhora', ROUND(AVG(valor), 2) AS 'media' FROM vw_registros
        WHERE tipo = '${tipoComponente}' AND idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'
        GROUP BY CAST(dataEhora AS DATE)
        ORDER BY dataEhora`;
    }
    else{
        instrucaoSql = `SELECT DATEPART(MONTH, dataEhora) AS 'dataEhora', ROUND(AVG(valor), 2) AS 'media' FROM vw_registros
        WHERE tipo = '${tipoComponente}' AND idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'
        GROUP BY DATEPART(MONTH, dataEhora)
        ORDER BY dataEhora`;
    }
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarTempo(fkMaquina, dataInicio, dataFinal){
    instrucaoSql = `SELECT dataEntrada, dataSaida
    FROM Localizacao
    WHERE fkMaquina = ${fkMaquina} AND CAST(dataEntrada AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'`;
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarKpis(idMaquina, dataInicio, dataFinal){
    instrucaoSql = `SELECT COUNT(*) / 3 AS 'qtdMinutos',
        (SELECT ROUND(AVG(valor), 2) FROM vw_registros WHERE tipo = 'CPU' AND idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}') AS 'mediaProcessador',
        (SELECT ROUND(AVG(valor), 2) FROM vw_registros WHERE tipo = 'RAM' AND idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}') AS 'mediaRAM'
    FROM vw_registros WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}';`;
    console.log(instrucaoSql)
    return database.executar(instrucaoSql);
}

function verificarAtividade(idMaquina){
    instrucaoSql = `SELECT TOP 1 dataEntrada, dataSaida FROM Localizacao WHERE fkMaquina = ${idMaquina} ORDER BY idLocalizacao DESC;`;
    console.log(instrucaoSql)
    return database.executar(instrucaoSql);
}

function pegarKpisRede(idMaquina, dataInicio, dataFinal){
    instrucaoSql = `SELECT COUNT(*) / 3 AS 'qtdMinutos',
    (SELECT ROUND(AVG(bytesRecebidos), 2) FROM vw_rede WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}') AS 'mediaDownload',
    (SELECT ROUND(AVG(bytesEnviados), 2) FROM vw_rede WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}') AS 'mediaUpload'
    FROM vw_rede WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}';`;
    console.log(instrucaoSql)
    return database.executar(instrucaoSql);
}

function analiseBytes(idMaquina, dataInicio, dataFinal, tipoVisualizacao = "dia"){
    if(tipoVisualizacao == "dia"){
        instrucaoSql = `SELECT CAST(dataEhora AS DATE) AS 'dataEhora', ROUND(AVG(bytesRecebidos), 2) AS 'media' FROM vw_rede
        WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'
        GROUP BY CAST(dataEhora AS DATE)
        ORDER BY dataEhora;`;
    }

    else{
        instrucaoSql = `SELECT DATEPART(MONTH, dataEhora) AS 'dataEhora', ROUND(AVG(bytesRecebidos), 2) AS 'media' FROM vw_rede
        WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'
        GROUP BY DATEPART(MONTH, dataEhora)
        ORDER BY dataEhora`;
    }
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function analiseBytes2(idMaquina, dataInicio, dataFinal, tipoVisualizacao = "dia"){
    if(tipoVisualizacao == "dia"){
        instrucaoSql = `SELECT CAST(dataEhora AS DATE) AS 'dataEhora', ROUND(AVG(bytesEnviados), 2) AS 'media' FROM vw_rede
        WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'
        GROUP BY CAST(dataEhora AS DATE)
        ORDER BY dataEhora;`;
    }

    else{
        instrucaoSql = `SELECT DATEPART(MONTH, dataEhora) AS 'dataEhora', ROUND(AVG(bytesEnviados), 2) AS 'media' FROM vw_rede
        WHERE idMaquina = ${idMaquina} AND CAST(dataEhora AS DATE) BETWEEN '${dataInicio}' AND '${dataFinal}'
        GROUP BY DATEPART(MONTH, dataEhora)
        ORDER BY dataEhora`;
    }
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
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