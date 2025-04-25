// models/humeurs.model.js
const db = require("../config/db");

const getAllHumeurs = (userId, callback) => {
  db.query("SELECT * FROM `humeurs` where user_id = ?",[userId], (err, result) => {
    if (err) {
      console.error("erreur du serveur sql : ", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
const getHumeursId = (id, callback) => {
  db.query("SELECT * FROM `humeurs` WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const ajouterUneHumeur = (humeur, date, commentaire,userId, callback) => {
  const req =
    "INSERT INTO `humeurs`( `humeur`, `date`, `commentaire`, `user_id`) VALUES (?,?,?,?)";
  const values = [humeur, date, commentaire,userId];
  db.query(req, values, (err, results) => {
    if (err) {
      console.error("erreur lors de l'insertion :", err);
      return callback(err, null); 
    }
    console.log("humeur ajoutée");
    callback(null, results); 
  });
};

const modifierUneHumeur = (id, humeur, date, commentaire, callback) => {
  const req =
    "UPDATE `humeurs` SET `humeur`=?, `date`=?, `commentaire`=? WHERE `id` = ?";
  const values = [humeur, date, commentaire, id];
  db.query(req, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return callback(err, null);
    }
    console.log("Humeur modifiée");
    callback(null, results); 
  });
};

const suprimerUneHumeur = (id, callback) => {
  db.query("DELETE FROM `humeurs` WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
module.exports = {
  getAllHumeurs,
  getHumeursId,
  ajouterUneHumeur,
  modifierUneHumeur,
  suprimerUneHumeur,
};
