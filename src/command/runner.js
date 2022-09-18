"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hamiltonGenerator_1 = __importDefault(require("../hamiltonGenerator"));
const validator_1 = __importDefault(require("./validator"));
exports.default = (boardSize, start, hasStopOnFirs = false) => {
    const [a, b] = start.split(/[, ]/);
    const startPoint = {
        a: BigInt(a),
        b: BigInt(b),
    };
    (0, validator_1.default)(boardSize, startPoint);
    (0, hamiltonGenerator_1.default)(boardSize, startPoint, hasStopOnFirs);
};
