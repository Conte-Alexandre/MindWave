document
  .getElementById("ConnexionForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const nom = document.getElementById("nom").value;
    const mdp = document.getElementById("mdp").value;

    // Création de l'objet à envoyer
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
      localStorage.setItem("token", result.token); // sauvegarde du token

    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de la connexion.");
    }
  });

// const divContenaire = document.getElementById("calendrier_contenaire");

// const dateTest = new Date(2025, 03, 0).getDate(); // Dernier jour de mars
// const dateDayStart = new Date(2025, 02, 1).getDay(); // Jour du 1er mars
// console.log("jour de la semaine vide : " + dateDayStart, dateTest);
// for (let i = 0; i < dateDayStart; i++) {
//   const div = document.createElement("div");
//   div.classList.add("bg-blue-500");
//   divContenaire.appendChild(div);
// }

// for (let i = 1; i <= dateTest; i++) {
//   const div = document.createElement("div");
//   div.textContent = i;
//   div.classList.add(
//     "bg-blue-500",
//     "rounded-full",
//     "w-8",
//     "h-8",
//     "flex",
//     "items-center",
//     "justify-center",
//     "text-white"
//   );
//   divContenaire.appendChild(div);
// }



