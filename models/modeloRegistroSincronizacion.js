const SchemaObject = require("schema-object");

const modelo = new SchemaObject({
dpi: { type: String, required: true },
type: { type: String, required: true },
blacklistid: { type: String, required: true },
name: { type: String, required: true },
nit: { type: String, required: false },
user_rs: { type: String, required: true },
state: { type: String, required: true },
id: { type: Number, required: false },
    reason_comment: { type: String, required: true },
    reason_dpi: { type: Boolean, required: true },
    reason_dpipicture: { type: Boolean, required: true },
    reason_holder: { type: Boolean, required: true },
    reason_interest: { type: Boolean, required: true },
    reason_other: { type: Boolean, required: true },
    reason_phone: { type: Boolean, required: true },
    reason_secure_info: { type: Boolean, required: true },
    state:{ type: String, required: false }
});
module.exports = modelo;