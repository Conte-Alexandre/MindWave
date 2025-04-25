document
  .getElementById("InscriptionForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const nom = document.getElementById("nom").value;
    const mdp = document.getElementById("mdp").value;
    const email = document.getElementById("email").value;

    if (!nom || !mdp || !email) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const data = { nom, mdp, email };

    try {
      const response = await fetch("https://mindwave.alwaysdata.net/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log("Réponse du serveur :", result);
        alert("Inscription réussie !");
        localStorage.setItem("token", result.token); 
      } else {
        const text = await response.text();
        console.error("Réponse du serveur (non JSON) :", text);
        alert("Erreur serveur, réponse non valide.");
      }

    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de l'envoi des données.");
    }
  });
