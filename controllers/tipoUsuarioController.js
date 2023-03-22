const { getTipoUsuariosDB, addTipoUsuarioDB, updateTipoUsuarioDB, deleteTipoUsuarioDB, getTipoUsuarioPorCodigoDB } = require('../useCases/tipoUsuarioUseCase')

const getTipoUsuarios = async (request, response) => {
    await getTipoUsuariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o Tipo de Usuario: ' + err
        }));
}

const addTipoUsuario = async (request, response) => {
    await addTipoUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Tipo de Usuario criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateTipoUsuario = async (request, response) => {
    await updateTipoUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Tipo de Usuario alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteTipoUsuario = async (request, response) => {
    await deleteTipoUsuarioDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getTipoUsuarioPorCodigo = async (request, response) => {
    await getTipoUsuarioPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getTipoUsuarios, addTipoUsuario, updateTipoUsuario, deleteTipoUsuario, getTipoUsuarioPorCodigo
}