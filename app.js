"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./api"));
const routes_1 = __importDefault(require("./routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const audit_middleware_1 = require("./middleware/audit.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '2mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from public/app directory
const publicAppPath = path_1.default.join(__dirname, '../../public/app');
app.use('/app', express_1.default.static(publicAppPath));
// Serve public root directory
const publicPath = path_1.default.join(__dirname, '../../public');
app.use('/public', express_1.default.static(publicPath));
// Default /app route serves welcome.html
app.get('/app', (_req, res) => {
    res.sendFile(path_1.default.join(publicAppPath, 'welcome.html'));
});
app.get('/', (_req, res) => {
    res.json({
        name: 'thera-backend',
        status: 'ok',
        message: 'Visit /app for the application',
    });
});
// Keep health checks public so uptime monitoring works even when auth is enabled.
app.use('/health', health_routes_1.default);
// Global middleware
app.use(auth_middleware_1.authMiddleware);
app.use(audit_middleware_1.auditLogger);
app.use('/api', api_1.default);
app.use('/api', routes_1.default);
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map