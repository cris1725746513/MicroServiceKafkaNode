const services = require("../services/db");
const utils = require("../utils/utils");
const Log = require("../models/Log");
const BlackListModel = require("../models/blacklistmodel");
const log = utils.getLog();
let infoLog;
const getblacklist = (request, response) => {
  infoLog = new Log({ uri: request.url, clientIP: utils.getClientIP(request) });
  utils.getLog().debug(infoLog, `Iniciando consumo, en método GET`);
  services
    .query('SELECT * FROM  public."blackList_Tables"')
    .then(function (results) {
      utils.getLog().debug(infoLog, `Exito al realizar la consulta ${results}`);
      response.status(200).json(results);
    });
};
const getblacklistId = (request, response) => {
  const id = parseInt(request.params.id);
  infoLog = new Log({ uri: request.url, clientIP: utils.getClientIP(request) });
  utils.getLog().debug(infoLog, `Iniciando consumo, en método GET`);
  services.query('SELECT * FROM  public."blackList_Tables" where "id"=@id', { id: id })
    .then(function (results) {
      utils.getLog().debug(infoLog, `Exito al realizar la consulta ${results}`);
      response.status(200).json(results);
    });
};
const createblacklist = (request, response) => {
  const modelo = new BlackListModel(request.body);
  infoLog = new Log({ uri: request.url, clientIP: utils.getClientIP(request) });
  utils.getLog().debug(infoLog, `Iniciando consumo, en método Create`);
  var blackList = services.model({ table: '"blackList_Tables"' });
  var db = blackList(modelo);
  db.save();
  response.json({ message: "blackList Creado" });
  utils.getLog().debug(infoLog, `Exito al realizar la consulta`);
};

const updateblacklist = (request, response) => {
  const id = parseInt(request.params.id);
  const modelo = new BlackListModel(request.body);
  infoLog = new Log({ uri: request.url, clientIP: utils.getClientIP(request) });
  utils.getLog().debug(infoLog, `Iniciando consumo, en método Update`);
  var blackList = services.model({ table: '"blackList_Tables"' });
  var db = blackList(modelo);
  db.update();
  utils.getLog().debug(infoLog, `Exito al realizar la consulta ${modelo}`);
  response.json({ message: "blackList actualizado" });
};

const deleteblacklist = (request, response) => {
  const id = parseInt(request.params.id);
  infoLog = new Log({ uri: request.url, clientIP: utils.getClientIP(request) });
  utils.getLog().debug(infoLog, `Iniciando consumo, en método Delete`);
  services
    .query('DELETE FROM public."blackList_Tables" WHERE "id"=@id', { id: id })
    .then(function () {
      utils.getLog().debug(infoLog, `Exito al eliminar`);
      response.json({ message: "blackList Eliminado" });
    });
};
module.exports = {
  getblacklist,
  getblacklistId,
  createblacklist,
  updateblacklist,
  deleteblacklist,
};
