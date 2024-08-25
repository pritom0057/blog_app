"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)(); // Create the Express app
const port = 3000;
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions)); // Apply CORS options
app.use(express_1.default.json());
// Use the blog routes
app.use('/api', blogRoutes_1.default);
database_1.default.sync().then(() => {
    console.log('Database connected and models synced');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
app.get('/', (req, res) => {
    res.send('Blog API with TypeScript and PostgreSQL is running');
});
// Listen only if this file is being executed directly, not imported
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
// Export the app for testing
exports.default = app;
