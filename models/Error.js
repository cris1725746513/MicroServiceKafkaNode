const SchemaObject = require('schema-object');

const ErrorSchema = new SchemaObject({
    errorCode: Number,
    errorType: String,
    code: String,
    description: String
});
module.exports = ErrorSchema;
