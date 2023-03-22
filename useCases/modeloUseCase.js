const { pool } = require('../config');
const Modelo = require('../entities/modelo')

const getModelosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM modelos order by codigo');
        return rows.map((modelo) => new Modelo(modelo.codigo, modelo.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addModeloDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO modelos (nome) 
        values ($1) returning codigo, nome`,
        [nome]);
        const modelo = results.rows[0];
        return new Modelo(modelo.codigo, modelo.nome);
    } catch (err) {
        throw "Erro ao inserir o Modelo: " + err;
    }    
}


const updateModeloDB = async (body) => {
    try {   
        const { codigo, nome}  = body; 
        const results = await pool.query(`UPDATE modelos SET nome=$1
        where codigo=$2 returning codigo, nome`,
        [nome, codigo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const modelo = results.rows[0];
        return new Modelo(modelo.codigo, modelo.nome);
    } catch (err) {
        throw "Erro ao alterar o Modelo: " + err;
    }      
}

const deleteModeloDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM modelos WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Modelo removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o Modelo: " + err;
    }     
}

const getModeloPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM modelos WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const modelo = results.rows[0];
            return new Modelo(modelo.codigo, modelo.nome);            
        }       
    } catch (err) {
        throw "Erro ao recuperar o Modelo: " + err;
    }     
}


module.exports = {
    getModelosDB, addModeloDB, updateModeloDB, deleteModeloDB, getModeloPorCodigoDB
}