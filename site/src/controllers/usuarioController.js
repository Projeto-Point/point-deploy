var usuarioModel = require("../models/usuarioModel");

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

// function verificarGerente(req, res) {
//     var idGerente = req.body.idGerenteServer;
//     var senha = req.body.senhaServer;

//     if (idGerente == undefined) {
//         res.status(400).send("Seu idGerente está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         usuarioModel.entrar(idGerente, senha)
//             .then(
//                 function (resultado) {
//                     console.log(`\nResultados encontrados: ${resultado.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

//                     if (resultado.length == 1) {
//                         console.log(resultado);
//                         res.json(resultado[0]);
//                     } else if (resultado.length == 0) {
//                         res.status(403).send("Senha inválida");
//                     } 
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao alterar usuario! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

function cadastrarEmpresaGerente(req, res) {
    // Empresa
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cnpj = req.body.cnpjServer;
    var plano = req.body.planoServer;
    // Funcionário
    var nomeGerente = req.body.nomeGerenteServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;

    // Validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (nomeGerente == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if(plano == undefined){
        res.status(400).send("Seu plano está undefined!");
    }
    else {
        usuarioModel.cadastrarEmpresa(nomeEmpresa, cnpj, plano).then(function (resultado) {
            usuarioModel.cadastrarUsuario(nomeGerente, cpf, email, telefone, senha, resultado[0].idEmpresa).then(function (resultado2) {
                res.json(resultado2);
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeFuncServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tel = req.body.telServer;
    var cargo = req.body.cargoServer;
    var idEmpresa = req.body.idEmpresaServer;
    var idGestor = req.body.idGestorServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("O cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("A senha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("O telefone está undefined!");
    } else if (tel == undefined) {
        res.status(400).send("O idEmpresa está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarFuncionario(nome, cpf, email, senha, cargo, tel, idGestor, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeFuncServer;
    var senha = req.body.senhaServer;
    var tel = req.body.telServer;
    var cargo = req.body.cargoServer;
    var idFuncionario = req.body.idFuncionarioServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("A senha está undefined!");
    } else if (tel == undefined) {
        res.status(400).send("O idEmpresa está undefined!");
    } else if (idFuncionario == undefined) {
        res.status(400).send("O idfuncionario está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.alterarFuncionario(nome, senha, cargo, tel, idFuncionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao alterar o Funcionario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function removerFuncionario(req, res){

    const idFuncionario = req.query.idFuncionario;

    if(idFuncionario == undefined || idFuncionario == null){
        res.status(400).send("O idFuncionario está undefined!");
    }else{

        usuarioModel.removerFuncionario(idFuncionario)
            .then(

                function(resultado){
                    res.json(resultado);
                }
            ).catch(

                function(erro){

                    console.log(erro)
                    console.log(
                        "\nHouve um erro ao alterar o Funcionario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function alterarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    const idEmpresa = req.query.idEmpresa;
    const nome = req.body.novoNomeEmpresaServer;
    const plano = req.body.novoPlanoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (plano == undefined) {
        res.status(400).send("O plano está undefined!");
    }else if(idEmpresa == undefined){
        res.status(400).send("O idEmpresa está undefined!");
    }else{
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.alterarEmpresa(nome, plano, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar ao atualizar empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function listarFuncionarios(req, res) {
    const idEmpresa = req.query.idEmpresa;
    usuarioModel.listarFuncionarios(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function pegarDadosAtuais(req, res) {
    const idFuncionario = req.query.idFuncionario;
    usuarioModel.pegarDadosAtuais(idFuncionario)
        .then(function (resposta) {
            res.status(200).json(resposta);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os registroAtualFuncionario.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function pegarDadosAtuaisEmpresa(req, res) {
    const idEmpresa = req.query.idEmpresa;
    usuarioModel.pegarDadosAtuaisEmpresa(idEmpresa)
        .then(function (resposta) {
            res.status(200).json(resposta);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os registroAtualFuncionario.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function getSenhaGestor(req, res) {
    const idGestor = req.query.idFuncionario;
    usuarioModel.getSenhaGestor(idGestor)
        .then(function (resposta) {
            res.status(200).json(resposta);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os registroAtualFuncionario.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    entrar,
    cadastrarEmpresaGerente,
    cadastrarFuncionario,
    alterarFuncionario,
    listarFuncionarios,
    pegarDadosAtuais,
    getSenhaGestor,
    pegarDadosAtuaisEmpresa,
    alterarEmpresa,
    removerFuncionario
}