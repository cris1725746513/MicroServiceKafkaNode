const express = require("express");
const bodyParser = require("body-parser");
const rt = require("./routes/routes");
const config = require("config");
const utils = require("./utils/utils");
const Log = require("./models/Log");
const timeout = require("connect-timeout");
const msg = require("./utils/msgKafka");
const prueba = require("./models/respuestaQvantel");
const sendMail = require("./utils/sendSmtp");
//const consume = require("./consume")
const app = express();
const log = utils.getLog();
app.use(timeout(config.get("localServer.timeout")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*if(config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}*/
app.get("/SD", (request, response) => {
  const bmsg= msg.verifSmg(data);
  if(bmsg){
 // const regI=  msgServices.createRegistro_sincronizacion(data);
  //console.log (regI);
  const  s =prueba.crearRespuestaQ(data);
  response.json(s);
  
  }else {

  } 
});
app.route("/blacklist").get(rt.getblacklist).post(rt.createblacklist);
app
  .route("/blacklist/:id")
  .get(rt.getblacklistId)
  .put(rt.updateblacklist)
  .delete(rt.deleteblacklist);
app.listen(
  config.get("localServer.port"),
  config.get("localServer.host"),
  () => {
    utils
      .getLog()
      .info(
        new Log(),
        `listening on port ${config.get("localServer.port")}...`
      );
  }
);
//sendMail.sendMail("PRUEBA FUNCIONAMIENTO DESARROLLO",/*"catmanyan@hotmail.com"*/"fjrodriguez@tigo.com.gt");
const data = {
  dpi: "0061234567890",
  blacklistId: "5cc081a65f5449ebcdbf250e",
  last_name: "Last",
  name: "Test 06",
  nit: "06123456",
  reason: {
    comment: "razón adicional o comentario adicional",
    dpi: false,
    dpiPicture: false,
    holder: false,
    interest: false,
    other: false,
    phone: false,
    secureInfo: true,
  },
  user: "rzepeda",
  type:"INSERT",
};
console.log('Despliegue exitoso')

/*consume().catch((err) => {
	console.error("error in consumer: ", err)
})*/
module.exports = app;
