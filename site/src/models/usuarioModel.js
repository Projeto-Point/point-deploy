var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Funcionario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'gestor';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function verificarGerente(idGerente, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idGerente, senha)
//     var instrucao = `
//         SELECT * FROM Funcionario WHERE email = '${idGerente}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nomeEmpresa, cnpj, plano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, cnpj, plano);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Empresa (nome, cnpj, plano) OUTPUT Inserted.idEmpresa VALUES ('${nomeEmpresa}', '${cnpj}', ${plano});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

} function cadastrarUsuario(nomeGerente, cpf, email, telefone, senha, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeGerente, cpf, email, senha, idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Funcionario (nome, cpf, senha, email, telefone, fkEmpresa) VALUES ('${nomeGerente}', '${cpf}', '${senha}', '${email}', '${telefone}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nome, cpf, email, senha, cargo, tel, idGestor, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, email, senha, idGestor, idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Funcionario (nome, cpf, senha, email, telefone, cargo, fkGestor, fkEmpresa) VALUES ('${nome}', '${cpf}', '${senha}', '${email}','${tel}', '${cargo}', ${idGestor}, ${idEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarFuncionario(nome, senha, cargo, tel, idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, senha, cargo, tel, idFuncionario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    update funcionario set nome= '${nome}', senha= '${senha}', telefone = '${tel}' , cargo= '${cargo}' where idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function alterarEmpresa(nome, plano, idEmpresa) {
    var instrucao = `
    update Empresa set nome='${nome}', plano='${plano}' where idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFuncionarios(idEmpresa){
    var instrucao = `SELECT idFuncionario, nome, email, telefone, cargo FROM Funcionario WHERE fkEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function removerFuncionario(idFuncionario){
    var instrucao = `DELETE FROM [dbo].[Funcionario] WHERE idFuncionario = ${idFuncionario};`
    return database.executar(instrucao)
}

function pegarDadosAtuais(idFuncionario){
    var instrucao = `SELECT idFuncionario, nome, email, telefone, cargo, senha FROM Funcionario WHERE idFuncionario = ${idFuncionario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarDadosAtuaisEmpresa(idEmpresa){
    var instrucao = `SELECT E.nome,E.cnpj, E.plano FROM [dbo].[Empresa] E
    INNER JOIN [dbo].[Funcionario] F ON idEmpresa = fkEmpresa
    WHERE idEmpresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getSenhaGestor(idGestor){
    var instrucao = `SELECT nome, senha FROM Funcionario WHERE idFuncionario = ${idGestor}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarUsuario,
    cadastrarFuncionario,
    listarFuncionarios,
    pegarDadosAtuais,
    alterarFuncionario,
    getSenhaGestor,
    pegarDadosAtuaisEmpresa,
    alterarEmpresa,
    removerFuncionario
};