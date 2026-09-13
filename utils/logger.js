"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringifyDetails(details) {
    if (details === undefined) {
        return '';
    }
    try {
        return ` ${JSON.stringify(details)}`;
    }
    catch {
        return ` ${String(details)}`;
    }
}
function log(level, message, details) {
    const line = `[${level.toUpperCase()}] ${new Date().toISOString()} ${message}${stringifyDetails(details)}`;
    if (level === 'error') {
        console.error(line);
        return;
    }
    if (level === 'warn') {
        console.warn(line);
        return;
    }
    console.log(line);
}
const logger = {
    debug(message, details) {
        log('debug', message, details);
    },
    error(message, details) {
        log('error', message, details);
    },
    info(message, details) {
        log('info', message, details);
    },
    warn(message, details) {
        log('warn', message, details);
    },
};
exports.default = logger;
//# sourceMappingURL=logger.js.map