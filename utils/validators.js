const { isString, isBoolean, isInteger } = require("lodash");

const userValidatorMiddleware = (req, res, next) => {
    const { firstName, lastName, username, password, role } = req.body;
    if (!firstName || !isString(firstName) || firstName.length > 30) {
        res.status(400).json({message: 'Nombre invalido'});
    } else if (!lastName || !isString(lastName) || lastName.length > 30) {
        res.status(400).json({message: 'Apellido invalido'});
    } else if (!username || !isString(username) || username.length > 30) {
        res.status(400).json({message: 'Nombre de usuario invalido'});
    } else if (password && (!isString(password) || password.length > 30)) {
        res.status(400).json({message: 'Password invalido'});
    } else if (!role || !isString(role) || !['ADMIN', 'CUSTOMER'].includes(role)) {
        res.status(400).json({message: 'Rol invalido'});
    } else {
        next();
    }
};

const studentValidatorMiddleware = (req, res, next) => {
    const { firstName, lastName, active, carreerId } = req.body;
    if (!firstName || !isString(firstName) || firstName.length > 50) {
        res.status(400).json({message: 'Nombre invalido'});
    } else if (!lastName || !isString(lastName) || lastName.length > 50) {
      res.status(400).json({message: 'Apellido invalido'});
    } else if (!isBoolean(active)) {
      res.status(400).json({message: 'Valor de active invalido'});
    } else if (!isInteger(carreerId)) {
      res.status(400).json({message: 'Carrera invalida'});
    } else {
        next();
    }
};

const carreerValidatorMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name || !isString(name) || name.length > 50) {
      res.status(400).json({message: 'Nombre invalido'});
  } else {
      next();
  }
};

module.exports = {
    userValidatorMiddleware,
    studentValidatorMiddleware,
    carreerValidatorMiddleware,
};