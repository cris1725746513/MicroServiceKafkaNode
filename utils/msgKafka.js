const Log = require('../models/Log');
const modelomsg = require('../models/mssgkafka');
const Ajv = require("ajv");
const ajv = new Ajv() ;
exports.verifSmg = function verifSmg (data){
    const validate = ajv.compile(modelomsg);
    const valid = validate(data);
    if (!valid){
        return false;
    }else {
        return true;
    } 
}
