const humps = require('humps');
const { getAllCarreers, getCarreer: getDBCarreer, createCarreer: createDBCarreer, updateCarreer: updateDBCarreer, deleteCarreer: deleteDBCarreer } = require("../db/queries/carreers");

const listCarreers = {
    route: '/carreers/',
    callback: async (req, res) => {
        try {
            const carreers = await getAllCarreers();
            res.status(200).json(humps.camelizeKeys(carreers));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const getCarreer = {
    route: '/carreers/:id/',
    callback: async (req, res) => {
        try {
            const carreer = await getDBCarreer(req.params.id);
            res.status(200).json(humps.camelizeKeys(carreer));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const createCarreer = {
    route: '/carreers/',
    callback: async (req, res) => {
        const { name } = req.body;
        const inputCarreer = { name };
        try {
            const carreer = await createDBCarreer(inputCarreer);
            res.status(200).json(humps.camelizeKeys(carreer));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const updateCarreer = {
    route: '/carreers/:id/',
    callback: async (req, res) => {
        const { name } = req.body;
        const inputCarreer = { name };
        try {
            const carreer = await updateDBCarreer(req.params.id, inputCarreer);
            res.status(200).json(humps.camelizeKeys(carreer));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const deleteCarreer = {
    route: '/carreers/:id/',
    callback: async (req, res) => {
        try {
            await deleteDBCarreer(req.params.id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

module.exports = {
    listCarreers,
    getCarreer,
    createCarreer,
    updateCarreer,
    deleteCarreer,
};