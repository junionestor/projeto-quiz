import postgres from 'postgres';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get database URL from environment
const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('NETLIFY_DATABASE_URL or DATABASE_URL environment variable is required');
    process.exit(1);
}

const sql = postgres(databaseUrl, {
    ssl: 'require'
});

async function initDatabase() {
    try {
        console.log('Connecting to database...');
        
        // Read migration file
        const migrationPath = join(__dirname, 'migrations', '001_create_scores_table.sql');
        const migrationSQL = readFileSync(migrationPath, 'utf8');
        
        // Execute migration
        await sql.unsafe(migrationSQL);
        
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        await sql.end();
    }
}

initDatabase();

