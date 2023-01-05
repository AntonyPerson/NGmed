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

router.route("/add").post((req, res) => {
  const fileName = req.body.fileName;
  const watchCount = req.body.watchCount;
  const fileJason = req.body.fileJason;
  const personalnumber = req.body.personalnumber;

  const newExcelData = new ExcelData({
    fileName,
    watchCount,
    fileJason,
    personalnumber,
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

router.route("/:id").get((req, res) => {
  ExcelData.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  ExcelData.findByIdAndDelete(req.params.id)
    .then(() => res.json("ExcelData deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ExcelData.findById(req.params.id)
    .then((request) => {
      request.fileName = req.body.fileName;
      request.fileJason = req.body.fileJason;
      request.personalnumber = req.body.personalnumber;

      request
        .save()
        .then(() => res.json("ExcelData updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
