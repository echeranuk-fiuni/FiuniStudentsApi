const pool = require("../pool");

const FIELDS = 'id, first_name, last_name, active, carreer_id';

const getAllStudents = async userId => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM students WHERE user_id=$1 ORDER BY id ASC`,
        values: [userId],
    });
    return results.rows;
};

const getStudent = async (userId, id) => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM students WHERE id=$1 AND user_id=$2 ORDER BY id ASC`,
        values: [id, userId],
    });
    if (results.rowCount === 0) {
        throw new Error('Estudiante inexistente');
    }
    return results.rows[0];
};

const createStudent = async (userId, student) => {
    const results = await pool.query({
        text: `INSERT INTO students(user_id, first_name, last_name, active, carreer_id) VALUES($1, $2, $3, $4, $5) RETURNING *`,
        values: [userId, student.firstName, student.lastName, student.active, student.carreerId],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar estudiante');
    }
    return results.rows[0];
};

const updateStudent = async (userId, id, student) => {
    const results = await pool.query({
        text: 'UPDATE students SET first_name=$1, last_name=$2, active=$3, carreer_id=$4 WHERE id=$5 AND user_id=$6 RETURNING *',
        values: [student.firstName, student.lastName, student.active, student.carreerId, id, userId],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar estudiante');
    }
    return results.rows[0];
};

const deleteStudent = async (userId, id) => {
    const results = await pool.query({
        text: 'DELETE FROM students WHERE id=$1 AND user_id=$2',
        values: [id, userId],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo eliminar estudiante');
    }
    return true;
};

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
};