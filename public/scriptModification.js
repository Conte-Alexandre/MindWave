document
  .getElementById("humeurModifForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const humeur = document.getElementById("humeur").value;
    const date = document.getElementById("date").value;
    const commentaire = document.getElementById("commentaire").value;

    const data = { humeur, date, commentaire };
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    try {
      const response = await fetch(`https://mindwave.alwaysdata.net/humeurs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Réponse du serveur :", result);
      alert("Humeur ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de l'ajout de l'humeur.");
    }
  });
