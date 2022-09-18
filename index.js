#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_usage_1 = __importDefault(require("command-line-usage"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const runner_1 = __importDefault(require("./src/command/runner"));
const optionList = [
    { name: 'boardSize', alias: 'n', type: BigInt, description: 'Szerokość szachownicy' },
    { name: 'start', alias: 's', type: String, description: 'Punkt startowy w formacie a,b np. a,3' },
    { name: 'first', alias: 'f', type: Boolean, description: 'Zatrzymaj na pierwszym znalezisku' },
    { name: 'help', alias: 'h', type: Boolean, description: 'Wyświetla tę pomoc' },
];
const sections = [
    {
        header: 'Aplikacja generująca cykl Hamiltona',
        content: 'Generates something {italic very} important.',
    },
    {
        header: 'Opcje',
        optionList,
    },
    {
        header: 'Przykład użycia',
        content: 'node index.js --boardSize=6 --start=0,0\n\nnode index.js -n 6 -s "0,0" -f',
    }
];
const options = (0, command_line_args_1.default)(optionList);
if (options.help || !options.boardSize || !options.start) {
    console.log((0, command_line_usage_1.default)(sections));
    process.exit();
}
(0, runner_1.default)(options.boardSize, options.start, options.first);
