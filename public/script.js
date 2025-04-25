// Récupérer le token du localStorage
const token = localStorage.getItem("token");

// Soumission du formulaire d'ajout d'humeur
document
  .getElementById("humeurForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const humeur = document.getElementById("humeur").value;
    const date = document.getElementById("date").value;
    const commentaire = document.getElementById("commentaire").value;

    const data = { humeur, date, commentaire };

    try {
      const response = await fetch("https://mindwave.alwaysdata.net/humeurs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

// ---------------------------
// Variables globales pour mois/année
let moisActuel = new Date().getMonth(); // 0 = Janvier
let anneeActuelle = new Date().getFullYear();

// Récupérer les humeurs (GET avec token)
async function fetchHumeurs() {
  try {
    const response = await fetch("https://mindwave.alwaysdata.net/humeurs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur de récupération des données");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des humeurs:", error);
  }
}

// Organiser les humeurs par date
async function getHumeursParJour() {
  const humeurs = await fetchHumeurs();
  const humeursParJour = {};

  humeurs.forEach((humeur) => {
    humeursParJour[humeur.date] = humeur.humeur;
  });

  return humeursParJour;
}

// Statistiques avec Chart.js
async function getStat() {
  const humeurs = await fetchHumeurs();
  if (!humeurs) return;

  const humeurListe = {};
  humeurs.forEach((humeur) => {
    humeurListe[humeur.humeur] = (humeurListe[humeur.humeur] || 0) + 1;
  });

  const xValues = Object.keys(humeurListe);
  const yValues = Object.values(humeurListe);
  const barColors = ["red", "green", "blue", "orange", "purple"];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors.slice(0, xValues.length),
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Répartition des humeurs",
      },
    },
  });
}

// Générer le calendrier pour un mois/année donné
async function genererCalendrier(mois = moisActuel, annee = anneeActuelle) {
  const humeursParJour = await getHumeursParJour();
  const divContenaire = document.getElementById("calendrier_contenaire");
  divContenaire.innerHTML = "";

  const lastDay = new Date(annee, mois + 1, 0).getDate();
  const firstDay = new Date(annee, mois, 1).getDay();

  // Titre mois
  const nomDuMois = new Date(annee, mois).toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  document.getElementById("month").textContent =
    nomDuMois.charAt(0).toUpperCase() + nomDuMois.slice(1);

  for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
    const div = document.createElement("div");
    div.classList.add("bg-transparent");
    divContenaire.appendChild(div);
  }

  for (let i = 1; i <= lastDay; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    div.classList.add(
      "rounded-full",
      "w-8",
      "h-8",
      "flex",
      "items-center",
      "justify-center",
      "text-black"
    );

    const moisStr = (mois + 1).toString().padStart(2, "0");
    const jourStr = i.toString().padStart(2, "0");
    const dateStr = `${annee}-${moisStr}-${jourStr}`;
    const humeur = humeursParJour[dateStr];

    if (humeur === "En_colère") {
      div.classList.add("bg-red-100", "border-2", "border-red-500");
    } else if (["Heureux", "Neutre"].includes(humeur)) {
      div.classList.add("bg-green-100", "border-2", "border-green-500");
    } else if (["Triste", "Stressé", "Déprimé"].includes(humeur)) {
      div.classList.add("bg-red-100", "border-2", "border-red-500");
    } else {
      div.classList.add("hover:bg-blue-100", "hover:border-2", "hover:border-blue-500");
    }

    divContenaire.appendChild(div);
  }
}

// Boutons de navigation mois +/-
function modifierMois() {
  document.getElementById("more").addEventListener("click", () => {
    moisActuel++;
    if (moisActuel > 11) {
      moisActuel = 0;
      anneeActuelle++;
    }
    genererCalendrier(moisActuel, anneeActuelle);
  });

  document.getElementById("less").addEventListener("click", () => {
    moisActuel--;
    if (moisActuel < 0) {
      moisActuel = 11;
      anneeActuelle--;
    }
    genererCalendrier(moisActuel, anneeActuelle);
  });
}

if (!token) {
  // Pas de token → redirection vers la page de connexion
  window.location.href = '/formConnexion.html';
} else {
  // Optionnel : tu peux faire un fetch pour valider le token
  fetch('/humeurs/mes-humeurs', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(res => {
    if (res.status !== 200) {
      window.location.href = '/formConnexion.html';
    }
  });
}
// Initialisation au chargement
window.onload = function () {
  genererCalendrier();
  getStat();
  modifierMois();
};
