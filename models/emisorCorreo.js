const SchemaObject = require('schema-object');

const emisorCorreo = new SchemaObject({
    receptor:  { type: String, required: true },
    msg:  { type: String, required: true }
});
module.exports = emisorCorreo;