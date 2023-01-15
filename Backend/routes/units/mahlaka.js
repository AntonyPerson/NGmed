const express = require("express");
const router = express.Router();

const {
  create,
  find,
  update,
  remove,
  findById,
  findmahlakabyid,
  updateploga,
  mahlakabyplogaid,
} = require("../../controllers/units/mahlaka");

// find spec
router.get("/mahlaka/:id", findById);
router.get("/mahlaka", find);
//add
router.post("/mahlaka", create); /**/
//update
router.put("/mahlaka/:mahlakaId", update);
//delete
router.delete("/mahlaka/:id", remove);

router.post("/mahlaka/mahlakabyid", findmahlakabyid);

router.post("/mahlaka/updateploga", updateploga);

router.post("/mahlaka/mahlakabyplogaid", mahlakabyplogaid);

module.exports = router;
