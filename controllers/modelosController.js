const { getModelosDB, addModeloDB, updateModeloDB, deleteModeloDB, getModeloPorCodigoDB } = require('../useCases/modeloUseCase')

const getModelos = async (request, response) => {
    await getModelosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o Modelo: ' + err
        }));
}

const addModelo = async (request, response) => {
    await addModeloDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Modelo criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateModelo = async (request, response) => {
    await updateModeloDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Modelo alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteModelo = async (request, response) => {
    await deleteModeloDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getModeloPorCodigo = async (request, response) => {
    await getModeloPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getModelos, addModelo, updateModelo, deleteModelo, getModeloPorCodigo
}