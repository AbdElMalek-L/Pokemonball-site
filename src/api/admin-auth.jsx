// src/api/admin-auth.jsx
import fs from 'fs/promises';
import path from 'path';

// Correct path to db.json (assuming it's in root/db folder)
const DB_PATH = path.join(process.cwd(), 'db', 'db.json');

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    console.log(data);
    // return JSON.parse(data);
  } catch (error) {
    // Return default structure if file is missing
    return { users: [] };
  }
}

async function writeDB(data) {
  // Create directory if it doesn't exist
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function handler({ action, email, password, newPassword }) {
  console.log("Auth request received:", { action, email });

  // Validate required fields
  if (!action) throw new Error("Action is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const db = await readDB();
  const user = db.users.find(u => u.email === email);

  try {
    switch (action) {
      case "login":
        if (user?.pass === password) {
          console.log("Login successful");
          return { success: true, message: "Login successful" };
        }
        console.log("Login failed: Invalid credentials");
        return { success: false, error: "Invalid email or password" };

      case "change-credentials":
        if (!newPassword) throw new Error("New password is required");
        
        if (user?.pass === password) {
          user.pass = newPassword;
          await writeDB(db);
          console.log("Password updated successfully");
          return { success: true, message: "Password changed successfully" };
        }
        return { success: false, error: "Current credentials are invalid" };

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    console.error("Auth error:", error.message);
    return { success: false, error: error.message };
  }
}