const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "your-host",
  user: "your-user",
  password: "your-password",
  database: "your-dataBase",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", err);
    return;
  }
  console.log("Connecté à MySQL !");
});

module.exports = db;
