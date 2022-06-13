const msg = require("../utils/msgKafka");
const services = require("../services/db");
const utils = require("../utils/utils");
const Log = require("../models/Log");
const mrs = require("../models/modeloRegistroSincronizacion");
const mrs2 = require("../models/mssgkafka");
const log = utils.getLog();
let infoLog;

const createRegistro_sincronizacion = (modelo_RS) => {
  const modelo = modelo_RS;
  const data ={
    dpi:modelo.dpi,
    type:modelo.type,
    blacklistid:modelo.blacklistId,
    name:modelo.name,
    nit:modelo.nit,
    reason_comment:modelo.reason.comment,
    reason_dpi:modelo.reason.dpi,
    reason_dpipicture:modelo.reason.dpiPicture,
    reason_holder:modelo.reason.holder,
    reason_interest: modelo.reason.interest,
    reason_other:modelo.reason.other,
    reason_phone: modelo.reason.phone,
    reason_secure_info: modelo.reason.secureInfo,
    user_rs: modelo.user,
    state:'Registrado'}
  const md = new mrs(data);
  infoLog = new Log({ uri: modelo });
  utils.getLog().debug(infoLog, `Iniciando Registro_sincronizacion`);
  var Registro = services.model({ table: '"Registro_sincronizacion"' });
  var db = Registro(md);
    db.save();
    services.query('SELECT max (id) as id  FROM  public."Registro_sincronizacion"').then(function (result) {
      utils.getLog().debug(infoLog, `Exito al realizar Registro_sincronizacion`);
      return result[0];
    });
};


module.exports = {
  createRegistro_sincronizacion,
};
