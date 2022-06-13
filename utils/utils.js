const config = require('config');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const bunyan = require('bunyan');
const os = require('os');
const ip = require('ip');
const Log = require('../models/Log');

const logLevel = process.env.LOGLEVEL || config.get('log.level');
const ErrorModel = require('../models/Error');

exports.errorHandler = function errorHandler(errParam, req, res, next) {
    let err = errParam; // EsLint: Assignment to function parameter
    if (err.status === 503) {
        err = exports.error(503);
        const log = exports.getLog();
        const infoLog = new Log({
            uri: req.url,
            clientIP: exports.getClientIP(req)
        });
        infoLog.responseCode = 503;
        log.error(infoLog, exports.getError(exports.error(503)));
    }
    if (!err.status) err = exports.error(500);
    const status = err.status || 500;
    res.status(status).json({
        error: {
            errorCode: err.errorCode,
            errorType: err.errorType,
            code: err.code,
            description: err.description
        }
    });
};

exports.errorParse = function errorParse(code, errorDescription, errorCode, res) {
    const err = new ErrorModel();
    let errorResponse = {};
    switch (code) {
        case 400:
            err.errorCode = 400;
            err.errorType = 'MSJ';
            err.code = '001';
            err.description = 'Bad Request.';
            break;
        case 401:
            err.errorCode = 401;
            err.errorType = 'SEG';
            err.code = '001';
            err.description = 'Invalid authorization token.';
            break;
        case 403:
            err.errorCode = 403;
            err.errorType = 'NEG';
            err.code = '001';
            err.description = 'Business error.';
            break;
        case 404:
            err.errorCode = 404;
            err.errorType = 'MSJ';
            err.code = '002';
            err.description = 'Not Found';
            break;
        case 500:
            err.errorCode = 500;
            err.errorType = 'Internal server error.';
            err.code = '001';
            err.description = 'Internal server error.';
            break;
        case 503:
            err.errorCode = 503;
            err.errorType = 'COM';
            err.code = '003';
            err.description = 'There is no communication with the service.';
            break;
        case 504:
            err.errorCode = 504;
            err.errorType = 'COM';
            err.code = '003';
            err.description = 'There is no communication with the service.';
            break;
        default:
            err.description = 'Unknow error.';
    }
    err.description = errorDescription || err.description;
    err.code = errorCode || err.code;
    errorResponse = {
        'error': err
    };
    return errorResponse;
};

exports.error = function error(code, errorDescription, errorCode, res) {
    exports.error = function error2(codeStatus, description) {
        const err = new Error();
        if (codeStatus === '-1') {
            err.status = 403;
        } else {
            err.status = codeStatus;
        }
        switch (codeStatus) {
            case 204:
                err.errorCode = 204;
                err.errorType = 'MSJ';
                err.code = '002';
                err.description = 'Suscriptor No existe';
                break;
            case 400:
                err.errorCode = 400;
                err.errorType = 'MSJ';
                err.code = '001';
                err.description = 'Error en mensaje de entrada.';
                break;
            case 401:
                err.errorCode = 401;
                err.errorType = 'SEG';
                err.code = '001';
                err.description = 'Token invalido de autorización.';
                break;
            case 403:
                err.errorCode = 403;
                err.errorType = 'NEG';
                err.code = '003';
                err.description = 'Error del servicio legado.';
                break;
            case 409:
                err.errorCode = 409;
                err.errorType = 'NEG';
                err.code = '003';
                err.description = 'El cliente no tiene facturas pendientes';
                break;
            case 404:
                err.errorCode = 404;
                err.errorType = 'MSJ';
                err.code = '002';
                err.description = 'Tratando de acceder a recurso que no existe';
                break;
            case 500:
                err.errorCode = 500;
                err.errorType = 'INF';
                err.code = '003';
                err.description = 'Internal server error.';
                break;
            case 503:
                err.errorCode = 503;
                err.errorType = 'COM';
                err.code = '003';
                err.description = 'No hay comunicacion con el servicio.';
                break;
            case 504:
                err.errorCode = 504;
                err.errorType = 'COM';
                err.code = '003';
                err.description = 'No hay comunicacion con el servicio.';
                break;
            default:
                if (code) {
                    err.errorCode = 403;
                    err.errorType = 'NEG';
                    err.code = code;
                    err.description = description;
                } else {
                    err.description = 'Unknown error.';
                }
        }

        if (!description) return err;

        err.description = description;
        return err;
    };
};

exports.error503 = function error503(req, res, next) {
    next(exports.error(503));
};
exports.error404 = function error404(req, res, next) {
    next(exports.error(404));
};

exports.isAuthorized = function isAuthorized(token) {
    if (config.get('localServer.security.enable')) {
        if (token === config.get('localServer.security.token')) return true;
        try {
            const secret = Buffer.from(config.get('localServer.security.secret'), config.get('localServer.security.type'));
            const decoded = jwt.decode(token, secret, false, config.get('localServer.security.algorithm'));
            if ((decoded.user === config.get('localServer.security.user')) && (decoded.password === config.get('localServer.security.password'))) {
                const timestamp = moment(this.convertTimezone(new Date()));
                const timestampMin = moment(timestamp).subtract(config.get('localServer.security.lagTime'), 'seconds');
                if ((moment(decoded.date) >= timestampMin) && (moment(decoded.date) <= timestamp)) {
                    return true;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    }
    return true;
};
exports.getLog = function getLog() {
    const log = bunyan.createLogger({
        name: config.get('log.name'),
        hostname: `${os.hostname()} : ${ip.address()}`,
        streams: [{
            level: 'debug',
            name: 'debug',
            path: config.get('log.levels.debug')
        }, {
            level: 'error',
            name: 'error',
            path: config.get('log.levels.error')
        }],
        apiKey: '',
        uri: '',
        responseCode: '',
        responseTime: '',
        clientIP: ''
    });

    switch (logLevel) {
        case 'ERROR':
            log.levels('debug', 60);
            log.levels('error', 50);
            break;
        case ('INFO'):
            log.levels('debug', 30);
            log.levels('error', 50);
            break;
        case 'DEBUG':
            log.levels('debug', 20);
            log.levels('error', 50);
            break;
        default:
            break;
    }
    return log;
};

exports.getError = function getError(err) {
    const errorModel = new ErrorModel();
    errorModel.errorCode = err.code;
    errorModel.errorType = err.description;
    return errorModel;
};

exports.getResponseTime = function getResponseTime(startTime) {
    const endTime = moment(new Date());
    const duration = moment.duration(endTime.diff(startTime));
    return duration.as('milliseconds');
};

exports.getClientIP = function getClientIP(req) {
    return req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.socket.remoteAddress
        || req.connection.socket.remoteAddress;
};

exports.getConfigurationAxios = function getConfigurationAxios() {
    const timeoutConf = config.get('remoteService.timeout');
    const remotToken = config.get('remoteService.token');
    const configuration = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${remotToken}`
        },
        'timeout': timeoutConf
    };
    return configuration;
};
