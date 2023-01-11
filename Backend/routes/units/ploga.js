const express = require("express");
const router = express.Router();

const {
  create,
  find,
  update,
  remove,
  findById,
  findplogabyid,
  updategdod,
  plogabygdodid,
} = require("../../controllers/units/ploga");

// find spec
router.get("/ploga/:id", findById);
router.get("/ploga", find);
//add
router.post("/ploga", create); /**/
//update
router.put("/ploga/:gdodId", update);
//delete
router.delete("/ploga/:id", remove);

router.post("/ploga/plogabyid", findplogabyid);

router.post("/ploga/updategdod", updategdod);

router.post("/ploga/plogabygdodid", plogabygdodid);

module.exports = router;
