const objetUtilisateur = require("../models/utilisateurs.model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "UTuFViayk5AxYjp9a9DHvLjnNiER45m3";
const getLesUtilisateur = async (req, res) => {
  objetUtilisateur.getAllUtilisateur((err, users) => {
    if (err) {
      return res.status(500).json({ message: "erreur serveur" });
    }
    res.status(200).json(users);
  });
};

const addUser = async (req, res) => {
  console.log("Données reçues :", req.body);

  const { nom, email, mdp } = req.body;
  console.log(nom);
  if (!nom || !email || !mdp) {
    console.log("Données manquantes :", { nom, email, mdp });
    return res.status(400).json({ message: "Données manquantes" });
  }
  objetUtilisateur.ajouterUnUtilisateur(nom, email, mdp, (err, result) => {
    if (err) {
      console.error("erreur lors de l'ajout de l'utilisateur : ", err);
      return res.status(500).json({ message: "erreur serveur " });
    }
    console.log("utilisateur ajouter avec succès : ", result);
    res.status(200).json({ message: "utilisateur ajoutée" });
  });
};
const updateUser = async (req, res) => {
  console.log("Données reçues :", req.body);
  const id = req.params.id;

  const { nom, email, mdp } = req.body;
  console.log(nom);
  if (!nom || !email || !mdp) {
    console.log("Données manquantes :", { nom, email, mdp });
    return res.status(400).json({ message: "Données manquantes" });
  }
  objetUtilisateur.modifierUnUtilisateur(id, nom, email, mdp, (err, result) => {
    if (err) {
      console.error("erreur lors de la modification de l'utilisateur : ", err);
      return res.status(500).json({ message: "erreur serveur " });
    }
    console.log("utilisateur modifier avec succès : ", result);
    res.status(200).json({ message: "utilisateur modifier" });
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  objetUtilisateur.suprimerUnUtilisateur(id, (err, result) => {
    if (err) {
      console.error("erreur lors de la supression de l'utilisateur : ", err);
      return res.status(500).json({ message: "erreur serveur " });
    }
    console.log("utilisateur suprimer avec succès : ", result);
    res.status(200).json({ message: "utilisateur suprimer" });
  });
};
const getUtilisateurById = async (req, res) => {
  const id = req.params.id;
  console.log("ID reçu :", id);

  objetUtilisateur.getUtilisateurId(id, (err, humeur) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json(humeur);
  });
};
const loginUser = async (req, res) => {
  console.log("Données reçues :", req.body);
  const { nom, mdp } = req.body;
  console.log(nom);
  
  if (!nom || !mdp) {
    console.log("Données manquantes :", { nom, mdp });
    return res.status(400).json({ message: "Données manquantes" });
  }

  objetUtilisateur.getUtilisateurNom(nom, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur : ", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Erreur, aucun utilisateur trouvé" });
    }

    const utilisateur = result[0];

    if (utilisateur.mot_de_passe === mdp) {
      const token = jwt.sign(
        {
          user_id: utilisateur.id,
          nom: utilisateur.nom,
        },
        SECRET_KEY,
        { expiresIn: "2h" } 
      );

      return res.status(200).json({
        message: "Connexion réussie",
        token: token,
        user: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
        },
      });
    } else {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
  });
};

module.exports = {
  getLesUtilisateur,
  getUtilisateurById,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
};
