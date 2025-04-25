const token = localStorage.getItem("token");

async function fetchUsers() {
  try {
    const response = await fetch("https://mindwave.alwaysdata.net/humeurs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Erreur de récupération des données");
    }

    const humeurs = await response.json();
    const humeursList = document.getElementById("userList");

    if (humeurs.length === 0) {
      humeursList.innerHTML = "<li class='text-center text-gray-500'>Aucune Humeurs trouvé.</li>";
      return;
    }

    humeurs.forEach((humeur) => {
      const li = document.createElement("li");
      li.classList.add("bg-white", "p-4", "shadow-lg", "rounded-lg", "flex", "justify-between", "items-center");

      li.innerHTML = `
        <span class="text-gray-800">${humeur.date} - ${humeur.humeur} - ${humeur.commentaire}</span>
        <div class="space-x-2">
          <a href="./modification.html?id=${humeur.id}" class="text-blue-500 hover:text-blue-700">Modifier</a>
          <button class="text-red-500 hover:text-red-700" onclick="deleteHumeur(${humeur.id}, this)">Supprimer</button>
        </div>
      `;

      humeursList.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  }
}

async function deleteHumeur(id, button) {
  if (confirm("Voulez-vous vraiment supprimer cet élément ?")) {
    try {
      const response = await fetch(`https://mindwave.alwaysdata.net/humeurs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        button.closest('li').remove();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  }
}

if (!token) {
window.location.href = '/formConnexion.html';
} else {
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


window.onload = fetchUsers;