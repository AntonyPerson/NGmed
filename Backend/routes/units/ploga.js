const express = require("express");
const router = express.Router();

const {
  findPlogaByIdG,
  findAll,
  findPlogaByIdP,
  plogaByGdodId,
  createPloga,
  updatePloga,
  updategdod,
  removeGdod,
} = require("../../controllers/units/ploga");

// find spec
router.get("/ploga/:id", findPlogaByIdG);
router.get("/ploga", findAll);
router.post("/ploga/PlogaByIdP", findPlogaByIdP);
router.post("/ploga/plogaByGdodId", plogaByGdodId);

//add
router.post("/ploga/add", createPloga); /**/

//update
router.put("/ploga/update/:id", updatePloga);
router.post("/ploga/update/updatGdod", updategdod);

//delete
router.delete("/ploga/remove/:id", removeGdod);

module.exports = router;
