const express = require("express");
const router = express.Router();

const {
  findMahlakaByIdG,
  findAll,
  findMahlakaById,
  mahlakaByPlogaId,
  createMahlaka,
  updateMahlaka,
  updateploga,
  removeMahlaka,
} = require("../../controllers/units/mahlaka");

// find spec
router.get("/mahlaka/:id", findMahlakaByIdG);
router.get("/mahlaka", findAll);
router.post("/mahlaka/findMahlakaById", findMahlakaById);
router.post("/mahlaka/mahlakaByPlogaId", mahlakaByPlogaId);

//add
router.post("/mahlaka", createMahlaka); /**/

//update
router.put("/mahlaka/:mahlakaId", updateMahlaka);
router.post("/mahlaka/updateploga", updateploga);

//delete
router.delete("/mahlaka/:id", removeMahlaka);
module.exports = router;
