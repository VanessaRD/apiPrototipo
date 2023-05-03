const { autenticaUsuarioDB } = require('../useCases/segurancaUseCases');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    console.log("Body recebido: " + JSON.stringify(request.body));
    await autenticaUsuarioDB(request.body)
    .then(usuario => { 
        console.log('Usuario: ' + JSON.stringify(usuario))       ;
        const token = jwt.sign( { usuario } , process.env.SECRET ,  {
            expiresIn : 300 
        });
        return response.json({ auth : true, token : token});
    }).catch(err => response.status(401).json({auth : false, 
    message : err}));
}

function verificaJWT(request, response, next){
    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({auth:false,
         message:'Nenhum token recebido'});
    jwt.verify(token, process.env.SECRET, function(err, decoded){
         if (err) return response.status(401).json({auth:false,
            message:'Erro ao autenticar o token'});
         console.log('Token decodificado: ' + JSON.stringify(decoded.usuario));
         // estou enviando o usuário na requisição para o 
         // proximo elemento da pilha usar
         request.usuario = decoded.usuario;
         next();
    })
}

module.exports = {
    login, verificaJWT
}