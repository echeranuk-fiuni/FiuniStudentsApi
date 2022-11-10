const pool = require("../pool");

const FIELDS = 'id, name';

const getAllCarreers = async () => {
    const results = await pool.query(`SELECT ${FIELDS} FROM carreers ORDER BY id ASC`);
    return results.rows;
};

const getCarreer = async id => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM carreers WHERE id=$1 ORDER BY id ASC`,
        values: [id],
    });
    if (results.rowCount === 0) {
        throw new Error('Carrera inexistente');
    }
    return results.rows[0];
};

const createCarreer = async carreer => {
    const results = await pool.query({
        text: 'INSERT INTO carreers(name) VALUES($1) RETURNING *',
        values: [carreer.name],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar carrera');
    }
    return results.rows[0];
};

const updateCarreer = async (id, carreer) => {
    const results = await pool.query({
        text: 'UPDATE carreers SET name = $1 WHERE id = $2 RETURNING *',
        values: [carreer.name, id],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar carrera');
    }
    return results.rows[0];
};

const deleteCarreer = async id => {
    const results = await pool.query({
        text: 'DELETE FROM carreers WHERE id=$1',
        values: [id],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo eliminar carrera');
    }
    return true;
};

module.exports = {
    getAllCarreers,
    getCarreer,
    createCarreer,
    updateCarreer,
    deleteCarreer,
};