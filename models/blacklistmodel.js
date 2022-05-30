const SchemaObject = require("schema-object");

const modelo = new SchemaObject({
  nombreBlacklist: { type: String, required: true },
  id: { type: String, required: true },
  status: { type: Boolean, required: true },
  duración: { type: String, required: true },
  descripcion: { type: String, required: true },
  uid: { type: String},
  createdDate: { type: Date},
  updatedDate: { type: Date},
});
module.exports = modelo;
//nombreBlacklist ,id,status,duración,descripcion