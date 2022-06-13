exports.crearRespuestaQ = function crearRespuestaQ(body_kafka) {
datos.included[0].attributes.parameters.TransactionType=( body_kafka.type==='INSERT') ? 'ADD': 'DEL'; //INSERT -> ADD o  REMOVE -> DEL
datos.included[0].attributes.parameters.Category= body_kafka.blacklistId; //atributo blacklist_id
datos.included[0].attributes.parameters.DocumentNumber = body_kafka.dpi; //valor de dpi
datos.included[0].attributes.parameters.reason.comment  = body_kafka.reason.comment; //datos enviados
datos.included[0].attributes.parameters.reason.dpi= body_kafka.reason.dpi;
datos.included[0].attributes.parameters.reason.dpiPicture= body_kafka.reason.dpiPicture;
datos.included[0].attributes.parameters.reason.holder= body_kafka.reason.holder;
datos.included[0].attributes.parameters.reason.interest= body_kafka.reason.interest;
datos.included[0].attributes.parameters.reason.other= body_kafka.reason.other;
datos.included[0].attributes.parameters.reason.phone= body_kafka.reason.phone;
datos.included[0].attributes.parameters.reason.secureInfo= body_kafka.reason.secureInfo;
  /*
   includes.attributes.parameters.ContactEmail
Pendiente definir si se deja blank “” o null
includes.attributes.parameters.CityDANE
Pendiente definir si se deja blank “” o null
includes.attributes.parameters.ContactAddress
Pendiente definir si se deja blank “” o null
includes.attributes.parameters.ContactNumber
Pendiente definir si se deja blank “” o null
   */
datos.included[0].attributes.parameters.user=body_kafka.user; // valor de user
return datos;
};
const datos = {
  data: {
    type: "processes-create",
    relationships: {
      new_instance: {
        data: {
          type: "processes",
          id: "customer-blacklist",
        },
      },
    },
  },
  included: [
    {
      id: "customer-blacklist",
      type: "processes",
      attributes: {
        parameters: {
          TransactionType: { type: String, required: true },
          Category:{ type: String, required: true },
          DocumentType: "CC",
          DocumentNumber: { type: String, required: true },
          ContactEmail: "someemail@domain.com",
          CityDANE: "05001000",
          ContactAddress: "Carrera 56A No. 51 - 81",
          ContactNumber: "3014456231",
          reason: {
            comment: { type: String, required: true },
            dpi: { type: Boolean, required: true },
            dpiPicture: { type: Boolean, required: true },
            holder: { type: Boolean, required: true },
            interest: { type: Boolean, required: true },
            other: { type: Boolean, required: true },
            phone: { type: Boolean, required: true },
            secureInfo: { type: Boolean, required: true },
          },
          user:{ type: String, required: true },
        },
      },
      relationships: {
        action: {
          data: {
            type: "actions",
            id: "customer-blacklist",
          },
        },
      },
    },
  ],
}
