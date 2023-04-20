const { Router } = require('express');

const modelosController = require('../controllers/modelosController');
const portoesController = require('../controllers/portoesController');
const tipoUsuarioController = require('../controllers/tipoUsuarioController');
const carrosController = require('../controllers/carrosController');

const rotas = new Router();

//PORTÃO RESIDENCIAL

rotas.route('/portoes')
     .get(portoesController.getPortoes)
     .post(portoesController.addPortao)
     .put(portoesController.updatePortao)

rotas.route('/portoes/:codigo')
     .get(portoesController.getPortaoPorCodigo)
     .delete(portoesController.deletePortao)

//MODELO DE VEÍCULOS

rotas.route('/modelos')
     .get(modelosController.getModelos)
     .post(modelosController.addModelo)
     .put(modelosController.updateModelo)

rotas.route('/modelos/:codigo')
     .get(modelosController.getModeloPorCodigo)
     .delete(modelosController.deleteModelo)

//TIPOS DE USUÁRIO

rotas.route('/tiposUsuario')
     .get(tipoUsuarioController.getTipoUsuarios)
     .post(tipoUsuarioController.addTipoUsuario)
     .put(tipoUsuarioController.updateTipoUsuario)

rotas.route('/tiposUsuario/:codigo')
     .get(tipoUsuarioController.getTipoUsuarioPorCodigo)
     .delete(tipoUsuarioController.deleteTipoUsuario)

//CARROS

rotas.route('/carros')
     .get(carrosController.getCarros)
     .post(carrosController.addCarro)
     .put(carrosController.updateCarro)

rotas.route('/carros/:placa')
     .get(carrosController.getCarroPorCodigo)
     .put(carrosController.deleteCarro)
     

rotas.route('/carroDelete')
     .put(carrosController.deleteCarroBody)

module.exports = rotas;