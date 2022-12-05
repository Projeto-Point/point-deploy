var database = require("../database/config");

function pegarRegistroInstancia(idMaquina) {
    instrucaoSql = `SELECT * FROM [dbo].[Maquina], instancia WHERE idMaquina = ${idMaquina} AND nomeMaquina = nomeInstancia;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function horasAtivas(idMaquina) {
    instrucaoSql = `SELECT acao,
        CAST(dataEhora AS DATE) AS 'dia',
        CAST(AVG(CAST(dataEhora AS FLOAT)) AS DATETIME) AS 'horario'
        FROM Localizacao
         INNER JOIN Maquina ON fkMaquina = idMaquina
        WHERE idMaquina = ${idMaquina}
        GROUP BY acao, CAST(dataEhora AS DATE)`;
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function entradaEsaida(idMaquina) {
    instrucaoSql = `SELECT SUM(DATEDIFF(minute, dataEntrada, dataSaida)) as 'Tempo', CAST(dataEntrada AS DATE) as 'Data'
    FROM [dbo].[Localizacao] where fkMaquina =${idMaquina}
    GROUP BY CAST(dataEntrada AS DATE);`;
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}





module.exports = {
    horasAtivas,
    pegarRegistroInstancia,
    entradaEsaida,
    

}