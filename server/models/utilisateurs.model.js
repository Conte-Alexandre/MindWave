// models/humeurs.model.js
const db = require("../config/db");

const getAllUtilisateur = (callback) => {
  db.query("SELECT * FROM `utilisateurs`", (err, result) => {
    if (err) {
      console.error("erreur du serveur sql : ", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
const getUtilisateurId = (id, callback) => {
  db.query("SELECT * FROM `utilisateurs` WHERE `id`=?", [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
const getUtilisateurNom = (nom, callback) => {
  db.query(
    "SELECT * FROM `utilisateurs` WHERE `nom`=?",
    [nom],
    (err, result) => {
      if (err) {
        console.error("Erreur SQL :", err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};
const ajouterUnUtilisateur = (nom, email, mdp, callback) => {
  const sql =
    "INSERT INTO utilisateurs (`nom`, `e-mail`, `mot_de_passe`) VALUES (?, ?, ?)";
  const values = [nom, email, mdp];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return callback(err, null);
    }
    console.log("Utilisateur ajouté");
    callback(null, results);
  });
};
const modifierUnUtilisateur = (id, nom, email, mdp, callback) => {
  const req =
    "UPDATE `utilisateurs` SET `nom`=?,`e-mail`=?,`mot_de_passe`=? WHERE `id` =?";
  const values = [nom, email, mdp, id];
  db.query(req, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return callback(err, null);
    }
    console.log("utilisateur modifiée");
    callback(null, results); 
  });
};
const suprimerUnUtilisateur = (id, callback) => {
  db.query("DELETE FROM `utilisateurs` WHERE nom = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
module.exports = {
  getAllUtilisateur,
  getUtilisateurId,
  ajouterUnUtilisateur,
  modifierUnUtilisateur,
  suprimerUnUtilisateur,
  getUtilisateurNom,
};
