import * as fs from 'fs';
import BigMap from './types/BigMap';
import path, {dirname} from 'path';
import * as url from 'url';


const fieldSize = 100n;
const fontSize = 20n;
let i = 0;

export default (cycle: BigMap, boardSize: bigint) => {
  let svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
  '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
  '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n' +
  `<!-- ${cycle.toString()} -->`;

  let odd = true;
  for (let a = 0n; a < boardSize; a++) {
    svg += `<text x="${a*fieldSize + 50n + fontSize}" y="${fontSize - 2n}" fill="black">${a}</text>`;
    for (let b = 0n; b < boardSize; b++) {
      if (a === 0n) {
        svg += `<text x="${fontSize - 10n}" y="${b*fieldSize + 50n + fontSize}" fill="black">${b}</text>`;
      }
      svg += `<rect x="${a*fieldSize + fontSize}" y="${b*fieldSize + fontSize}" width="${fieldSize}" height="${fieldSize}" style="fill:${odd?'rgb(255,255,255)':'rgb(235,235,235)'};stroke-width:1;stroke:rgb(0,0,0,0.5)" />\n`;
      odd = !odd;
    }
    odd = !odd;
  }

  let lastValue: any = undefined;
  cycle.forEach((value, key) => {
    const [aStr, bStr] = value.split('x');
    const a = BigInt(aStr)*fieldSize + 50n + fontSize;
    const b = BigInt(bStr)*fieldSize + 50n + fontSize;

    svg += `<circle cx="${a}" cy="${b}" r="5" style="stroke:black;stroke-width:1;fill:${key ? 'rgba(23,225,0,0.99)' : 'rgba(255,0,28,0.99)'}" />\n`;

    if (!lastValue) {
      lastValue = {a,b};
      return;
    }
    svg += `<line x1="${a}" y1="${b}" x2="${lastValue.a}" y2="${lastValue.b}" style="stroke:rgba(24,154,0,0.99);stroke-width:2" />\n`;
    lastValue = {a,b};
  });

  const [aStr, bStr] = cycle.first.split('x');
  const a = BigInt(aStr)*fieldSize + 50n + fontSize;
  const b = BigInt(bStr)*fieldSize + 50n + fontSize;
  svg += `<line x1="${a}" y1="${b}" x2="${lastValue.a}" y2="${lastValue.b}" style="stroke:rgba(24,154,0,0.99);stroke-width:2;stroke-dasharray:6,6" />\n`;

  svg += '</svg>';

  const dir = `${boardSize}x${boardSize}-${cycle.first}`;
  const filePath = `${dir}/${i++}.svg`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const pathToFile = path.resolve(process.cwd(), filePath);
  const link = url.pathToFileURL(pathToFile);

  fs.writeFileSync(filePath, svg);
  return link;
}

