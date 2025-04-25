const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

const humeurs = require("./routes/humeur.routes");
const users = require("./routes/utilisateurs.routes");

app.use("/humeurs", humeurs);
app.use("/users", users);

app.get("/", (req, res) => {
  res.redirect("/index.html"); 
});

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
