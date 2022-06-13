const config = require('config');
const nodemailer = require('nodemailer');
const utils = require('../utils/utils');
const Log = require('../models/Log');
const log = utils.getLog();
let infoLog;

let transport = nodemailer.createTransport({
    host:config.get('email.host_smpt'),
    port:config.get('email.port_smpt'),
    secure: false,
   /* auth: {
       user:config.get('email.user_smpt'),
     //  pass:config.get('email.pass_smpt') 
    },*/
});

exports.sendMail = function sendMail (msg,rcp){
  infoLog = new Log({uri: rcp});
  utils.getLog().debug(infoLog, `Iniciando envio de correo`);
    const message = {
        from:'FMS-DBE@tigo.com.gt', //config.get('email.user_smpt'),
        to:rcp ,
        subject: 'PRUEBA ENVIO DE CORREO',
        text: msg 
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
          utils.getLog().error(infoLog, `Error al envio de correo ${err}`);
        } else {
          console.log(info);
          utils.getLog().debug(infoLog, `Exito al enviar correo a  ${rcp}`);
        }
    });
}
