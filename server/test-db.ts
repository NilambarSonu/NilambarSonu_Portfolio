// In test-db.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load your .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function checkConnection() {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set!");
    }

    console.log("Connecting to database...");

    // 2. Create the Drizzle client
    const sql = neon(connectionString);
    const db = drizzle(sql);

    // 3. Run a simple test query
    // This query just asks the database to return the number 1
    const result = await db.execute('select 1');

    if (result) {
      console.log("\n✅  Success! Database connection is working perfectly.");
      console.log("Test query result:", result);
    } else {
      throw new Error("Test query did not return a result.");
    }

  } catch (error) {
    console.error("\n❌  Error connecting to the database:");
    console.error(error);
    process.exit(1); // Exit with an error
  }
}

checkConnection();