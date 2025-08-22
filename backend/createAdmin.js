// createAdmin.js
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const readline = require("readline");

// setup terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root", // change if needed
  password: "Nessazure@15", // change if you set a MySQL root password
  database: "hospital_feedback",
});

// function to insert admin
async function createAdmin(username, plainPassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    console.log(`✅ Admin '${username}' created successfully!`);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    db.end();
    rl.close();
  }
}

// ask user for input
rl.question("Enter admin username: ", (username) => {
  rl.question("Enter admin password: ", (password) => {
    createAdmin(username, password);
  });
});
