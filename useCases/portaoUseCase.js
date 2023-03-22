const { pool } = require('../config');
const Portao = require('../entities/portao')

const getPortoesDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM portoes order by codigo');
        return rows.map((portao) => new Portao(portao.codigo, portao.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPortaoDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO portoes (nome) 
        values ($1) returning codigo, nome`,
        [nome]);
        const portao = results.rows[0];
        return new Portao(portao.codigo, portao.nome);
    } catch (err) {
        throw "Erro ao inserir o Portão: " + err;
    }    
}


const updatePortaoDB = async (body) => {
    try {   
        const { codigo, nome}  = body; 
        const results = await pool.query(`UPDATE portoes SET nome=$1
        where codigo=$2 returning codigo, nome`,
        [nome, codigo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const portao = results.rows[0];
        return new Portao(portao.codigo, portao.nome);
    } catch (err) {
        throw "Erro ao alterar o Portão: " + err;
    }      
}

const deletePortaoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM portoes WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Portão removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o Portão: " + err;
    }     
}

const getPortaoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM portoes WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const portao = results.rows[0];
            return new Portao(portao.codigo, portao.nome);            
        }       
    } catch (err) {
        throw "Erro ao recuperar o Portão: " + err;
    }     
}


module.exports = {
    getPortoesDB, addPortaoDB, updatePortaoDB, deletePortaoDB, getPortaoPorCodigoDB
}