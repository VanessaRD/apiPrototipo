const { getPortoesDB, addPortaoDB, updatePortaoDB, deletePortaoDB, getPortaoPorCodigoDB } = require('../useCases/portaoUseCase')

const getPortoes = async (request, response) => {
    await getPortoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o portão: ' + err
        }));
}

const addPortao = async (request, response) => {
    await addPortaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Portão criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updatePortao = async (request, response) => {
    await updatePortaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Portão alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deletePortao = async (request, response) => {
    await deletePortaoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getPortaoPorCodigo = async (request, response) => {
    await getPortaoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getPortoes, addPortao, updatePortao, deletePortao, getPortaoPorCodigo
}