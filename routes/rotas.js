const { Router } = require('express');

const modelosController = require('../controllers/modelosController');
const portoesController = require('../controllers/portoesController');
const carrosController = require('../controllers/carrosController');

const { login, verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login').post(login);

//PORTÃO RESIDENCIAL

rotas.route('/portoes')
     .get(verificaJWT, portoesController.getPortoes)
     .post(verificaJWT, portoesController.addPortao)
     .put(verificaJWT, portoesController.updatePortao)

rotas.route('/portoes/:codigo')
     .get(verificaJWT, portoesController.getPortaoPorCodigo)
     .delete(verificaJWT, portoesController.deletePortao)

//MODELO DE VEÍCULOS

rotas.route('/modelos')
     .get(verificaJWT, modelosController.getModelos)
     .post(verificaJWT, modelosController.addModelo)
     .put(verificaJWT, modelosController.updateModelo)

rotas.route('/modelos/:codigo')
     .get(verificaJWT, modelosController.getModeloPorCodigo)
     .delete(verificaJWT, modelosController.deleteModelo)

//CARROS

rotas.route('/carros')
     .get(verificaJWT, carrosController.getCarros)
     .post(verificaJWT, carrosController.addCarro)
     .put(verificaJWT, carrosController.updateCarro)

rotas.route('/carros/:placa')
     .get(verificaJWT, carrosController.getCarroPorCodigo)
     .put(verificaJWT, carrosController.deleteCarro)
     
rotas.route('/carroDelete')
     .put(verificaJWT, carrosController.deleteCarroBody)

module.exports = rotas;