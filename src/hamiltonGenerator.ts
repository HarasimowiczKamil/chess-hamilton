import BigMap from './types/BigMap';
import renderHamilton from './renderHamilton';
import debug from 'debug';

const LIMIT = 3* 60 * 60 * 1000; // ms
const startTime = new Date().getTime();

const logger = debug('chess-hamilton:fail-counter');

export interface Point {
  a: bigint,
  b: bigint,
}

const MOVE_FL = {a:  2n, b: -1n};
const MOVE_FR = {a:  2n, b:  1n};
const MOVE_LR = {a:  1n, b: -2n};
const MOVE_LL = {a: -1n, b: -2n};
const MOVE_DR = {a: -2n, b: -1n};
const MOVE_DL = {a: -2n, b:  1n};
const MOVE_RR = {a: -1n, b:  2n};
const MOVE_RL = {a:  1n, b:  2n};

const MOVES = [
  MOVE_FL,
  MOVE_FR,
  MOVE_LR,
  MOVE_LL,
  MOVE_DR,
  MOVE_DL,
  MOVE_RR,
  MOVE_RL,
];

const isInBoard = (boardSize: bigint, location: Point): boolean => {
  return location.a >= 0
    && location.b >= 0
    && location.a < boardSize
    && location.b < boardSize
    ;
}

const isInPath = (path: BigMap, location: Point): boolean => {
  return path.has(key(location));
}

const key = (point: Point): string => {
  return `${point.a}x${point.b}`;
};
let counter = 1n;
let failCounter = 0n;
let lastPrint = new Date().getTime();

const findPath = (boardSize: bigint, path: BigMap, lastStep: Point, onFind: (path: BigMap) => void): void => {
  if (new Date().getTime() - startTime > LIMIT) {
    console.error(`Przekroczono limit czasu ${LIMIT}`);
    process.exit(1);
  }

  const possibleMoves: Point[] = MOVES.filter((move) => {
    const newLocation = {
      a: lastStep.a + move.a,
      b: lastStep.b + move.b
    };

    return isInBoard(boardSize, newLocation) && !isInPath(path, newLocation);
  });

  if (possibleMoves.length === 0) {
    failCounter++;
    if (new Date().getTime() - lastPrint > 30000) {
      logger(`Odrzucono już ${failCounter} ścieżek`, (new Date().getTime() - startTime)/1000, 's');
      lastPrint = new Date().getTime();
    }
    return;
  }

  if (path.length + 1n === boardSize*boardSize) {
    // @ts-ignore
    const lastMove: Point = possibleMoves.pop();
    const lastPosition = {a: lastStep.a + lastMove.a, b: lastStep.b + lastMove.b};
    const winnerResult = path.clone().add(key(lastPosition));
    const [aStr, bStr] = path.first.split('x');
    const a = BigInt(aStr);
    const b = BigInt(bStr);

    // Test na Cykl Hamiltona, Ścieżka Hamiltona jest już na pewno
    const movToBegin = MOVES.filter((move) => {
      return a === lastPosition.a + move.a &&
        b === lastPosition.b + move.b;
    });
    if (movToBegin.length === 1) {
      onFind(winnerResult);
    }
    return;
  }

  possibleMoves.map((move: Point) => {
    const nextStep = {a: lastStep.a + move.a, b: lastStep.b + move.b};

    return findPath(boardSize, path.clone().add(key(nextStep)), nextStep, onFind);
  });
};

export default (boardSize: bigint, point: Point, hasStopOnFirs: boolean) => {
  const path = new BigMap();
  path.add(key(point));
  try {
    findPath(boardSize, path, point, (path) => {
      const link = renderHamilton(path, boardSize);
      console.log('Znaleziono Cykl Hamiltona!', `${link}`);
      if (hasStopOnFirs) {
        console.log('Zakończono po', (new Date().getTime() - startTime)/1000, 'ms');
        console.log(`Odrzucono ${failCounter} i znaleziono ${counter} Cykli Hamiltona`);
        process.exit(0);
      }
    });

    console.log('hamilton path', counter);
  } catch (e) {
    console.warn(e);
  }
};
