const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const ExcelDataSchema = new mongoose.Schema(
  {
    // user_card_number: String,
    fileName: { type: String, required: true },
    watchCount: { type: Number, required: true },
    fileJason: { type: Array, required: true },

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    publicFile: { type: Boolean, required: true, default: true },

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

    personalnumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExcelData", ExcelDataSchema);
