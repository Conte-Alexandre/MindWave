document
  .getElementById("InscriptionForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const nom = document.getElementById("nom").value;
    const mdp = document.getElementById("mdp").value;
    const email = document.getElementById("email").value;

    // Vérification que les champs sont remplis
    if (!nom || !mdp || !email) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    // Création de l'objet à envoyer
    const data = { nom, mdp, email };

    try {
      // Envoi de la requête POST pour ajouter l'utilisateur
      const response = await fetch("https://mindwave.alwaysdata.net/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Vérifier si la réponse est au format JSON
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        // Si c'est du JSON, traiter la réponse
        const result = await response.json();
        console.log("Réponse du serveur :", result);
        alert("Inscription réussie !");
        localStorage.setItem("token", result.token); // Sauvegarde du token dans le localStorage
      } else {
        // Si ce n'est pas du JSON, afficher une erreur
        const text = await response.text();
        console.error("Réponse du serveur (non JSON) :", text);
        alert("Erreur serveur, réponse non valide.");
      }

    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de l'envoi des données.");
    }
  });
