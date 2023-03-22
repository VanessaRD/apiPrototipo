const { pool } = require('../config');
const TipoUsuario = require('../entities/tipoUsuario')

const getTipoUsuariosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM tipoUsuario order by codigo');
        return rows.map((tipoUsuario) => new TipoUsuario(tipoUsuario.codigo, tipoUsuario.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addTipoUsuarioDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO tipoUsuario (nome) 
        values ($1) returning codigo, nome`,
        [nome]);
        const tipoUsuario = results.rows[0];
        return new TipoUsuario(tipoUsuario.codigo, tipoUsuario.nome);
    } catch (err) {
        throw "Erro ao inserir o Tipo de Usuário: " + err;
    }    
}


const updateTipoUsuarioDB = async (body) => {
    try {   
        const { codigo, nome}  = body; 
        const results = await pool.query(`UPDATE tipoUsuario SET nome=$1
        where codigo=$2 returning codigo, nome`,
        [nome, codigo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const tipoUsuario = results.rows[0];
        return new TipoUsuario(tipoUsuario.codigo, tipoUsuario.nome);
    } catch (err) {
        throw "Erro ao alterar o Tipo de Usuário: " + err;
    }      
}

const deleteTipoUsuarioDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM tipoUsuario WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Tipo de Usuário removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o Tipo de Usuário: " + err;
    }     
}

const getTipoUsuarioPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM tipoUsuario WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const tipoUsuario = results.rows[0];
            return new TipoUsuario(tipoUsuario.codigo, tipoUsuario.nome);            
        }       
    } catch (err) {
        throw "Erro ao recuperar o Tipo de Usuário: " + err;
    }     
}


module.exports = {
    getTipoUsuariosDB, addTipoUsuarioDB, updateTipoUsuarioDB, deleteTipoUsuarioDB, getTipoUsuarioPorCodigoDB
}