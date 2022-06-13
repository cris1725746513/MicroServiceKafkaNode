
const modelo = {
  type: "object",
  properties: {
    dpi: { type: "string" },
    blacklistId: { type: "string" },
    last_name: { type: "string" },
    name: { type: "string" },
    nit: { type: "string" },
    user: { type: "string" },
    reason: { type: "object", 
    properties: {
      comment: { type: "string" },
      dpi: { type: "boolean" },
      dpiPicture: { type: "boolean" },
      holder: { type: "boolean" },
      interest: { type: "boolean" },
      other: { type: "boolean" },
      phone: { type: "boolean" },
      secureInfo: { type: "boolean" },
    },
    required: [
      "comment",
      "dpi",
      "dpiPicture",
      "holder",
      "interest",
      "other",
      "phone",
      "secureInfo",
    ],
  }
  },
  required: ["dpi", "blacklistId", "last_name", "name","user","reason"],
};
module.exports = modelo;
