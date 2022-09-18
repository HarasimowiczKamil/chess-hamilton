"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const url = __importStar(require("url"));
const fieldSize = 100n;
const fontSize = 20n;
let i = 0;
exports.default = (cycle, boardSize) => {
    let svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
        '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n' +
        `<!-- ${cycle.toString()} -->`;
    let odd = true;
    for (let a = 0n; a < boardSize; a++) {
        svg += `<text x="${a * fieldSize + 50n + fontSize}" y="${fontSize - 2n}" fill="black">${a}</text>`;
        for (let b = 0n; b < boardSize; b++) {
            if (a === 0n) {
                svg += `<text x="${fontSize - 10n}" y="${b * fieldSize + 50n + fontSize}" fill="black">${b}</text>`;
            }
            svg += `<rect x="${a * fieldSize + fontSize}" y="${b * fieldSize + fontSize}" width="${fieldSize}" height="${fieldSize}" style="fill:${odd ? 'rgb(255,255,255)' : 'rgb(235,235,235)'};stroke-width:1;stroke:rgb(0,0,0,0.5)" />\n`;
            odd = !odd;
        }
        odd = !odd;
    }
    let lastValue = undefined;
    cycle.forEach((value, key) => {
        const [aStr, bStr] = value.split('x');
        const a = BigInt(aStr) * fieldSize + 50n + fontSize;
        const b = BigInt(bStr) * fieldSize + 50n + fontSize;
        svg += `<circle cx="${a}" cy="${b}" r="5" style="stroke:black;stroke-width:1;fill:${key === 0n ? 'rgba(255,0,28,0.99)' : 'rgba(23,225,0,0.99)'}" />\n`;
        if (!lastValue) {
            lastValue = { a, b };
            return;
        }
        svg += `<line x1="${a}" y1="${b}" x2="${lastValue.a}" y2="${lastValue.b}" style="stroke:rgba(24,154,0,0.99);stroke-width:2" />\n`;
        lastValue = { a, b };
    });
    const [aStr, bStr] = cycle.first.split('x');
    const a = BigInt(aStr) * fieldSize + 50n + fontSize;
    const b = BigInt(bStr) * fieldSize + 50n + fontSize;
    svg += `<line x1="${a}" y1="${b}" x2="${lastValue.a}" y2="${lastValue.b}" style="stroke:rgba(24,154,0,0.99);stroke-width:2;stroke-dasharray:6,6" />\n`;
    svg += '</svg>';
    const dir = `${boardSize}x${boardSize}-${cycle.first}`;
    const filePath = `${dir}/${i++}.svg`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const pathToFile = path_1.default.resolve(process.cwd(), filePath);
    const link = url.pathToFileURL(pathToFile);
    fs.writeFileSync(filePath, svg);
    return link;
};
