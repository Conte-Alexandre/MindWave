document
  .getElementById("ConnexionForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const nom = document.getElementById("nom").value;
    const mdp = document.getElementById("mdp").value;

    const data = { nom, mdp };

    try {
      const response = await fetch("https://mindwave.alwaysdata.net/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Réponse du serveur :", result);
      alert("connexion effectuer avec succès !");
      localStorage.setItem("token", result.token); 

    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de la connexion.");
    }
  });




