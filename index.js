require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { getHome } = require('./api/home');
const { listUsers, getUser, createUser, updateUser, deleteUser } = require('./api/users');
const { listStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('./api/students');
const { listCarreers, getCarreer, createCarreer, updateCarreer, deleteCarreer } = require('./api/carreers');
const { login, logout } = require('./api/sessions');
const { verifySessionMiddleware, currentTokens } = require('./utils/tokens');
const config = require('./config');
const { checkForAdminMiddleware } = require('./utils/permissions');
const { userValidatorMiddleware, studentValidatorMiddleware, carreerValidatorMiddleware } = require('./utils/validators');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

// Cors config
app.use(cors());

// Parser config
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// API routes matching
app.get(getHome.route, getHome.callback);
app.post(login.route, login.callback);
app.delete(logout.route, verifySessionMiddleware, logout.callback);

app.get(listUsers.route, verifySessionMiddleware, checkForAdminMiddleware, listUsers.callback);
app.get(getUser.route, verifySessionMiddleware, checkForAdminMiddleware, getUser.callback);
app.post(createUser.route, verifySessionMiddleware, checkForAdminMiddleware, userValidatorMiddleware, createUser.callback);
app.put(updateUser.route, verifySessionMiddleware, checkForAdminMiddleware, userValidatorMiddleware, updateUser.callback);
app.delete(deleteUser.route, verifySessionMiddleware, checkForAdminMiddleware, deleteUser.callback);

app.get(listCarreers.route, verifySessionMiddleware, checkForAdminMiddleware, listCarreers.callback);
app.get(getCarreer.route, verifySessionMiddleware, checkForAdminMiddleware, getCarreer.callback);
app.post(createCarreer.route, verifySessionMiddleware, checkForAdminMiddleware, carreerValidatorMiddleware, createCarreer.callback);
app.put(updateCarreer.route, verifySessionMiddleware, checkForAdminMiddleware, carreerValidatorMiddleware, updateCarreer.callback);
app.delete(deleteCarreer.route, verifySessionMiddleware, checkForAdminMiddleware, deleteCarreer.callback);

app.get(listStudents.route, verifySessionMiddleware, listStudents.callback);
app.get(getStudent.route, verifySessionMiddleware, getStudent.callback);
app.post(createStudent.route, verifySessionMiddleware, studentValidatorMiddleware, createStudent.callback);
app.put(updateStudent.route, verifySessionMiddleware, studentValidatorMiddleware, updateStudent.callback);
app.delete(deleteStudent.route, verifySessionMiddleware, deleteStudent.callback);

// API for tokens test
app.get('/tokens/', (req, res) => {
  if (config.debugTokens) {
    res.status(200).json(currentTokens);
  } else {
    res.status(401).json({});
  }
});

// Listen on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});