import postgres from 'postgres';

class ScoreService {
    constructor() {
        // Get database URL from environment (Netlify provides NETLIFY_DATABASE_URL)
        const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
        
        if (!databaseUrl) {
            throw new Error('NETLIFY_DATABASE_URL or DATABASE_URL environment variable is required');
        }

        // Initialize postgres connection
        this.sql = postgres(databaseUrl, {
            ssl: 'require',
            max: 1 // Use connection pooling
        });

        // Ensure table exists (create if not exists) - fire and forget
        this.ensureTableExists().catch(err => {
            console.error('Error initializing table:', err);
        });
    }

    async ensureTableExists() {
        try {
            await this.sql`
                CREATE TABLE IF NOT EXISTS scores (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    score INTEGER NOT NULL,
                    time INTEGER NOT NULL,
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            // Create index for faster queries
            await this.sql`
                CREATE INDEX IF NOT EXISTS idx_scores_score_time ON scores(score DESC, time ASC)
            `;
        } catch (error) {
            console.error('Error ensuring table exists:', error);
        }
    }

    async getAllScores() {
        try {
            // Query scores ordered by score DESC, then time ASC
            const scores = await this.sql`
                SELECT id, name, score, time, date, created_at
                FROM scores
                ORDER BY score DESC, time ASC
            `;
            
            // Convert to format expected by frontend
            return scores.map(score => ({
                id: score.id.toString(),
                name: score.name,
                score: score.score,
                time: score.time,
                date: score.date ? new Date(score.date).toISOString() : new Date().toISOString()
            }));
        } catch (error) {
            console.error('Erro ao ler scores:', error);
            return [];
        }
    }

    async createScore(name, score, time, date) {
        try {
            const dateValue = date ? new Date(date) : new Date();
            
            const [newScore] = await this.sql`
                INSERT INTO scores (name, score, time, date)
                VALUES (${name.trim()}, ${parseInt(score)}, ${parseInt(time)}, ${dateValue})
                RETURNING id, name, score, time, date
            `;

            return {
                id: newScore.id.toString(),
                name: newScore.name,
                score: newScore.score,
                time: newScore.time,
                date: newScore.date ? new Date(newScore.date).toISOString() : new Date().toISOString()
            };
        } catch (error) {
            console.error('Erro ao criar score:', error);
            return null;
        }
    }

    async clearScores() {
        try {
            await this.sql`DELETE FROM scores`;
            return true;
        } catch (error) {
            console.error('Erro ao limpar scores:', error);
            return false;
        }
    }

    // Cleanup method to close connection
    async close() {
        await this.sql.end();
    }
}

export default ScoreService;

