'use server';

import * as fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'src/data/info.json');

async function readDb() {
  try {
    const file = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(file);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return default structure
      return { profiles: {} };
    }
    console.error("Error reading database:", error);
    throw new Error("Could not read database.");
  }
}

async function writeDb(data: any) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing to database:", error);
    throw new Error("Could not write to database.");
  }
}

export async function saveApplication(applicationData: any) {
  try {
    const db = await readDb();
    const newId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    if (!db.profiles) {
      db.profiles = {};
    }

    db.profiles[newId] = { id: newId, ...applicationData };
    await writeDb(db);
    return { success: true, id: newId };
  } catch (error) {
    console.error("Failed to save application:", error);
    // In a real app, you'd want more robust error handling
    return { success: false, error: "Failed to save application." };
  }
}

export async function deleteUserData() {
    try {
        // Instead of deleting the file, we clear the profiles to avoid breaking static imports.
        await writeDb({ profiles: {} });
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user data:", error);
        return { success: false, error: "Failed to delete user data." };
    }
}
