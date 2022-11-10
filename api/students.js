const humps = require('humps');
const { getAllStudents, getStudent: getDBStudent, createStudent: createDBStudent, updateStudent: updateDBStudent, deleteStudent: deleteDBStudent } = require("../db/queries/students");
const { getCurrentUserId } = require("../utils/tokens");

const listStudents = {
    route: '/students/',
    callback: async (req, res) => {
        try {
            const students = await getAllStudents(getCurrentUserId(req));
            res.status(200).json(humps.camelizeKeys(students));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const getStudent = {
    route: '/students/:id/',
    callback: async (req, res) => {
        try {
            const student = await getDBStudent(getCurrentUserId(req), req.params.id);
            res.status(200).json(humps.camelizeKeys(student));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const createStudent = {
    route: '/students/',
    callback: async (req, res) => {
        const { firstName, lastName, active, carreerId } = req.body;
        const inputStudent = { firstName, lastName, active, carreerId };
        try {
            const student = await createDBStudent(getCurrentUserId(req), inputStudent);
            res.status(200).json(humps.camelizeKeys(student));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const updateStudent = {
    route: '/students/:id/',
    callback: async (req, res) => {
      const { firstName, lastName, active, carreerId } = req.body;
      const inputStudent = { firstName, lastName, active, carreerId };
        try {
            const student = await updateDBStudent(getCurrentUserId(req), req.params.id, inputStudent);
            res.status(200).json(humps.camelizeKeys(student));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const deleteStudent = {
    route: '/students/:id/',
    callback: async (req, res) => {
        try {
            await deleteDBStudent(getCurrentUserId(req), req.params.id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

module.exports = {
    listStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
};