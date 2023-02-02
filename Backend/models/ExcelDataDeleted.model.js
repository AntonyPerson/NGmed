const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const ExcelDataSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },

    pikod: { type: String, required: true },
    ogda: { type: String, required: true },
    hativa: { type: String, required: true },
    gdod: { type: String, required: true },
    ploga: { type: String, required: true },
    mahlaka: { type: String, required: true },

    pikodName: { type: String, required: true },
    ogdaName: { type: String, required: true },
    hativaName: { type: String, required: true },
    gdodName: { type: String, required: true },
    plogaName: { type: String, required: true },
    mahlakaName: { type: String, required: true },

    personalnumberUploader: { type: String, required: true },
    personalnumberDeleter: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExcelDataDeleted", ExcelDataSchema);
