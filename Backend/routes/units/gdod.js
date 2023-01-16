const express = require("express");
const router = express.Router();

const {
  removeGdod,
  findAll,
  findGdodByIdP,
  gdodsByHativaId,
  createGdod,
  updateGdod,
  updatehativa,
  removeGdod,

} = require("../../controllers/units/gdod");

// find spec
router.get("/gdod/:id", removeGdod);
router.get("/gdod", findAll);
router.post("/gdod/findGdodById", findGdodByIdP);
router.post("/gdod/gdodsbyhativaid", gdodsByHativaId);

//add
router.post("/gdod/add", createGdod); 

//update
router.put("/gdod/update/:id", updateGdod);
router.post("/gdod/update/updateHativa", updatehativa);

//delete
router.delete("/gdod/remove/:id", removeGdod);

module.exports = router;
