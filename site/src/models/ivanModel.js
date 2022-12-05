var database = require("../database/config");

function getLocalizacao(idEmpresa, filtro){   
    
        if(filtro == 'geral'){
            comando = `SELECT DISTINCT (longitude), latitude,cidade, pais, idFuncionario FROM [dbo].[Localizacao] L
            INNER JOIN Maquina M ON M.idMaquina = L.fkMaquina
            INNER JOIN [dbo].[Funcionario] F on M.fkFuncionario = F.idFuncionario
            INNER JOIN [dbo].[Empresa] E on F.fkEmpresa = E.idEmpresa
            WHERE idEmpresa = ${idEmpresa};
;`;
        }else if(filtro == 'servidor'){
            comando = `SELECT DISTINCT longitude, latitude, cidade, pais, idFuncionario FROM [dbo].[Localizacao] L
            INNER JOIN Maquina M ON M.idMaquina = L.fkMaquina
            INNER JOIN [dbo].[Funcionario] F on M.fkFuncionario = F.idFuncionario
            INNER JOIN [dbo].[Empresa] E on F.fkEmpresa = E.idEmpresa
            WHERE idEmpresa = ${idEmpresa} and M.tipo like 'Servidor';`;
        }else if(filtro == 'desktop'){
            comando = `SELECT DISTINCT longitude, latitude, cidade, pais, idFuncionario FROM [dbo].[Localizacao] L
            INNER JOIN Maquina M ON M.idMaquina = L.fkMaquina
            INNER JOIN [dbo].[Funcionario] F on M.fkFuncionario = F.idFuncionario
            INNER JOIN [dbo].[Empresa] E on F.fkEmpresa = E.idEmpresa
            WHERE idEmpresa = ${idEmpresa} and M.tipo like 'Desktop';`;
        }else{
            comando = ` SELECT DISTINCT longitude, latitude, cidade, pais, idFuncionario FROM [dbo].[Localizacao] L
            INNER JOIN Maquina M ON M.idMaquina = L.fkMaquina
            INNER JOIN [dbo].[Funcionario] F on M.fkFuncionario = F.idFuncionario
            INNER JOIN [dbo].[Empresa] E on F.fkEmpresa = E.idEmpresa
            WHERE idEmpresa = ${idEmpresa} AND L.pais like '${filtro}';`;
        }
        return database.executar(comando);
}

function getCidades(idEmpresa){
    comando = `SELECT pais, cidade
    FROM [dbo].[Funcionario] F
    INNER JOIN [dbo].[Maquina] M ON M.fkFuncionario = F.idFuncionario
    INNER JOIN [dbo].[Localizacao] L ON L.fkMaquina = M.idMaquina
    WHERE fkEmpresa = ${idEmpresa}
    GROUP BY cidade, pais
    ORDER BY count(DISTINCT idFuncionario) DESC;`;
    return database.executar(comando)
}


module.exports = {
    getLocalizacao,
    getCidades
}