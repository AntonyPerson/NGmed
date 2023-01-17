/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const ExcelData = require("../models/ExcelData.model");

router.route("/").get((req, res) => {
  ExcelData.find()
    // .sort({ createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get info without the fileJason - only there info for all the files
router.route("/getExcelsInfo").get((req, res) => {
  ExcelData.find()
    .select(
      "fileName watchCount startDate endDate personalnumber pikodName ogdaName hativaName gdodName plogaName mahlakaName"
    )
    // .sort({ createdAt: -1 })
    .where("publicFile")
    .equals("true")
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const fileName = req.body.fileName;

  const watchCount = req.body.watchCount;

  const fileJason = req.body.fileJason;

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const publicFile = req.body.publicFile;

  const personalnumber = req.body.personalnumber;

  const pikod = req.body.pikod;
  const ogda = req.body.ogda;
  const hativa = req.body.hativa;
  const gdod = req.body.gdod;
  const ploga = req.body.ploga;
  const mahlaka = req.body.mahlaka;

  const pikodName = req.body.pikodName;
  const ogdaName = req.body.ogdaName;
  const hativaName = req.body.hativaName;
  const gdodName = req.body.gdodName;
  const plogaName = req.body.plogaName;
  const mahlakaName = req.body.mahlakaName;

  const newExcelData = new ExcelData({
    fileName,
    watchCount,
    fileJason,
    startDate,
    endDate,
    publicFile,
    personalnumber,
    pikod,
    ogda,
    hativa,
    gdod,
    ploga,
    mahlaka,
    pikodName,
    ogdaName,
    hativaName,
    gdodName,
    plogaName,
    mahlakaName,
  });

  const fileId = newExcelData.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router
  .route("/uploadedExcelsByPersonalnumber/:personalnumber")
  .get((req, res) => {
    const personalnumber = req.params.personalnumber;
    // const personalnumber = "7654321";
    ExcelData.find({ personalnumber: personalnumber })
      .then((request) => res.json(request))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router
  .route("/getExcelsInfoByPersonalnumber/:personalnumber")
  .get((req, res) => {
    const personalnumber = req.params.personalnumber;
    ExcelData.find({ personalnumber: personalnumber })
      .select(
        "fileName watchCount startDate endDate publicFile personalnumber pikod ogda hativa gdod ploga mahlaka pikodName ogdaName hativaName gdodName plogaName mahlakaName"
      )
      // .sort({ createdAt: -1 })
      .then((request) => res.json(request))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router.route("/:id").get((req, res) => {
  ExcelData.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/ExcelInfo/:id").get((req, res) => {
  ExcelData.findById(req.params.id)
    .select(
      "fileName watchCount publicFile pikod ogda hativa gdod ploga mahlaka pikodName ogdaName hativaName gdodName plogaName mahlakaName"
    )
    // .sort({ createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  ExcelData.findByIdAndDelete(req.params.id)
    .then(() => res.json("ExcelData deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/updateInfo/:id").post((req, res) => {
  ExcelData.findById(req.params.id)
    .then((request) => {
      request.fileName = req.body.fileName;
      request.watchCount = req.body.watchCount;
      request.publicFile = req.body.publicFile;

      request.pikod = req.body.pikod;
      request.ogda = req.body.ogda;
      request.hativa = req.body.hativa;
      request.gdod = req.body.gdod;
      request.ploga = req.body.ploga;
      request.mahlaka = req.body.mahlaka;

      request.pikodName = req.body.pikodName;
      request.ogdaName = req.body.ogdaName;
      request.hativaName = req.body.hativaName;
      request.gdodName = req.body.gdodName;
      request.plogaName = req.body.plogaName;
      request.mahlakaName = req.body.mahlakaName;

      request
        .save()
        .then(() => res.json("ExcelData updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ExcelData.findById(req.params.id)
    .then((request) => {
      request.fileName = req.body.fileName;

      request.watchCount = req.body.watchCount;

      request.publicFile = req.body.publicFile;

      request.fileJason = req.body.fileJason;

      request.personalnumber = req.body.personalnumber;

      request.pikod = req.body.pikod;
      request.ogda = req.body.ogda;
      request.hativa = req.body.hativa;
      request.gdod = req.body.gdod;
      request.ploga = req.body.ploga;
      request.mahlaka = req.body.mahlaka;

      request.pikodName = req.body.pikodName;
      request.ogdaName = req.body.ogdaName;
      request.hativaName = req.body.hativaName;
      request.gdodName = req.body.gdodName;
      request.plogaName = req.body.plogaName;
      request.mahlakaName = req.body.mahlakaName;
      request
        .save()
        .then(() => res.json("ExcelData updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
