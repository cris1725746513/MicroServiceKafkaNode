const SchemaObject = require('schema-object');

const Log = new SchemaObject({
    apiKey: String,
    uri: String,
    responseCode: Number,
    responseTime: Number,
    clientIP: String
});
module.exports = Log;