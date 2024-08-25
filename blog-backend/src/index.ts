import express, { Application, Request, Response } from 'express';
import sequelize from './config/database';
import blogRoutes from "./routes/blogRoutes";
import cors from 'cors';
import dotenv from 'dotenv';


const app: Application = express(); // Create the Express app
const port = 3000;

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));  // Apply CORS options

app.use(express.json());

// Use the blog routes
app.use('/api', blogRoutes);

sequelize.sync().then(() => {
    console.log('Database connected and models synced');
}).catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Blog API with TypeScript and PostgreSQL is running');
});

// Listen only if this file is being executed directly, not imported
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

// Export the app for testing
export default app;
