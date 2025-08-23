import mysql from "mysql2";
import bcrypt from "bcrypt";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter admin username: ", (username) => {
  rl.question("Enter admin password: ", async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO admins (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      (err) => {
        if (err) {
          console.error("❌ Error creating admin:", err.message);
        } else {
          console.log("✅ Admin created successfully!");
        }
        rl.close();
        db.end();
      }
    );
  });
});
