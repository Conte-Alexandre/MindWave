const express = require("express");
const router = express.Router();
const humeurController = require("../controllers/humeurs.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/",verifyToken, humeurController.getAllHumeurs);
router.get("/:id", verifyToken, humeurController.getHumeursById);

router.post("/", verifyToken, humeurController.addHumeur);
router.put("/:id", verifyToken, humeurController.updateHumeursById);
router.delete("/:id", verifyToken, humeurController.deletHumeursById);

module.exports = router;
