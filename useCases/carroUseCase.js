const { pool } = require('../config');
const Carro = require('../entities/carro')

const getCarrosDB = async () => {
    try {
        const { rows } = await pool.query(`select s.placa as placa, s.ano as ano, 
        s.cor as cor, 
        s.modelo as modelo, m.nome as nomeModelo, s.portao as portao, p.nome as nomePortao
        from carros s
        join modelos m on s.modelo = m.codigo
        join portoes p on s.portao = p.codigo
        order by s.placa`);
        return rows.map((carro) => new Carro(carro.placa, carro.ano, carro.cor,
            carro.modelo, carro.nomeModelo, carro.portao, carro.nomePortao));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addCarroDB = async (body) => {
    try {
        const { placa, ano, cor, modelo, portao } = body;
        const results = await pool.query(`insert into carros (placa, ano, cor, modelo, portao) 
        values ($1, $2, $3, $4, $5)
        returning placa, ano, cor, modelo, portao`,
            [placa, ano, cor, modelo, portao]);
        const carro = results.rows[0];
        return new Carro(carro.placa, carro.ano, carro.cor, carro.modelo,
            carro.portao, "");
    } catch (err) {
        throw "Erro ao inserir a carro: " + err;
    }
}


const updateCarroDB = async (body) => {
    try {
        const { placa, ano, cor, modelo, portao } = body;
        const results = await pool.query(`UPDATE carros
        SET ano=$1, cor=$2, modelo=$3, portao=$4
        WHERE placa=$5 returning placa, ano, cor, modelo, portao`,
            [ano, cor, modelo, portao, placa]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${placa} para ser alterado`;
        }
        const carro = results.rows[0];
        return new Carro(carro.placa, carro.ano, carro.cor,
            carro.modelo, carro.portao, "");
    } catch (err) {
        throw "Erro ao alterar a carro: " + err;
    }
}

const deleteCarroDB = async (placa) => {
    try {
        console.log("A: " + placa)
        const results = await pool.query(`DELETE FROM carros WHERE placa = $1`,
            [placa]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${placa} para ser removido`;
        } else {
            return "Carro removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a carro: " + err;
    }
}

const deleteCarroDBBody = async (body) => {
    try {
        const { placa } = body;

        const results = await pool.query(`DELETE FROM carros WHERE placa = $1`,
            [placa]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${placa} para ser removido`;
        } else {
            return "Carro removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a carro: " + err;
    }
}

const getCarroPorCodigoDB = async (placa) => {
    try {
        const results = await pool.query(`SELECT * FROM carros WHERE placa = $1`,
            [placa]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + placa;
        } else {
            const carro = results.rows[0];
            return new Carro(carro.placa, carro.ano, carro.cor,
                carro.modelo, carro.portao, "");
        }
    } catch (err) {
        throw "Erro ao recuperar a carro: " + err;
    }
}


module.exports = {
    getCarrosDB, addCarroDB, updateCarroDB, deleteCarroDB, getCarroPorCodigoDB, deleteCarroDBBody
}