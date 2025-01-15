"use strict";

const path = require('path');
console.log('Current directory:', __dirname);
console.log('Expected path:', path.resolve(__dirname, './route/loginRoutes'));


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const loginRoutes_1 = require("@route/loginRoutes");
const PORT = parseInt(process.env.PORT || '8080', 10); // Use process.env.PORT if set, otherwise default to 8080
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/logindb'; // Use process.env.MONGO_URI if set, otherwise default
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGO_URI, {})
    .then(() => {
    console.log('MongoDB Connected');
})
    .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});
app.use('/api/login', loginRoutes_1.loginRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Login Service running on port ${PORT}`);
});
