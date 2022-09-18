"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (boardSize, start) => {
    if (boardSize <= start.a + 1n) {
        throw new Error(`Kolumna a ${start.a} znajduje się poza planszą ${boardSize}x${boardSize}`);
    }
    if (boardSize <= start.b + 1n) {
        throw new Error(`Wiersz b ${start.b} znajduje się poza planszą ${boardSize}x${boardSize}`);
    }
};
