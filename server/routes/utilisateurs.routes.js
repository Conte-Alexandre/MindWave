const express = require("express");
const router = express.Router();
const userController = require("../controllers/utilisateurs.controller");
const verifyToken = require("../middlewares/verifyToken");

//router.get("/",verifyToken, userController.getLesUtilisateur);
router.post("/login", userController.loginUser);
// router.get("/:id",verifyToken, userController.getUtilisateurById);
router.post("/", userController.addUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
module.exports = router;
