/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const ExcelDataDeleted = require("../models/ExcelDataDeleted.model");

router.route("/").get((req, res) => {
  ExcelDataDeleted.find()
    // .sort({ createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const fileName = req.body.fileName;

  const personalnumberUploader = req.body.personalnumberUploader;
  const personalnumberDeleter = req.body.personalnumberDeleter;

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

  const newExcelDataDeleted = new ExcelDataDeleted({
    fileName,
    personalnumberUploader,
    personalnumberDeleter,
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

  const fileId = newExcelDataDeleted.save((err, form) => {
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
    ExcelDataDeleted.find({ personalnumber: personalnumber })
      .then((request) => res.json(request))
      .catch((err) => res.status(400).json("Error: " + err));
  });



router.route("/:id").get((req, res) => {
  ExcelDataDeleted.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  ExcelDataDeleted.findByIdAndDelete(req.params.id)
    .then(() => res.json("ExcelData deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ExcelDataDeleted.findById(req.params.id)
    .then((request) => {
      request.fileName = req.body.fileName;

      request.countWatchesUsed = req.body.countWatchesUsed;

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
