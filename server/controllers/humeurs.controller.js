const objetHumeur = require("../models/humeurs.model");

const getAllHumeurs = async (req, res) => {
  const userId = req.user.user_id;
  objetHumeur.getAllHumeurs(userId,(err, humeurs) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json(humeurs);
  });
};

// Ajouter une nouvelle humeur
const addHumeur = async (req, res) => {
  console.log("Données reçues :", req.body);

  const { humeur: humeurText, date, commentaire } = req.body;
  const userId = req.user.user_id;

  if (!humeurText || !date || !commentaire) {
    console.log("Données manquantes :", { humeurText, date, commentaire });
    return res.status(400).json({ message: "Données manquantes" });
  }

  objetHumeur.ajouterUneHumeur(humeurText, date, commentaire,userId, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de l'humeur :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    console.log("Humeur ajoutée avec succès :", result);
    res.status(200).json({ message: "Humeur ajoutée", data: result });
  });
};

const getHumeursById = async (req, res) => {
  const id = req.params.id;
  console.log("ID reçu :", id);

  objetHumeur.getHumeursId(id, (err, humeur) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json(humeur);
  });
};
const updateHumeursById = async (req, res) => {
  const id = req.params.id;
  const { humeur, date, commentaire } = req.body;

  if (!humeur || !date || !commentaire) {
    return res.status(400).json({ message: "Données manquantes" });
  }

  console.log("Données reçues :", { id, humeur, date, commentaire });

  try {
    objetHumeur.modifierUneHumeur(
      id,
      humeur,
      date,
      commentaire,
      (err, result) => {
        if (err) {
          console.error("Erreur lors de la mise à jour :", err);
          return res.status(500).json({ message: "Erreur serveur" });
        }

        res.status(200).json({
          message: "Humeur mise à jour avec succès",
          data: result,
        });
      }
    );
  } catch (error) {
    console.error("Erreur serveur : ", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
const deletHumeursById = async (req, res) => {
  const id = req.params.id;
  console.log("ID reçu :", id);

  objetHumeur.suprimerUneHumeur(id, (err, humeur) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json({ message: "utilisateur supprimer" });
  });
};
module.exports = {
  getAllHumeurs,
  addHumeur,
  getHumeursById,
  updateHumeursById,
  deletHumeursById,
};
