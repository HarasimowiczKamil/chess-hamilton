import hamiltonGenerator, {Point} from '../hamiltonGenerator';
import validator from './validator';

export default (boardSize: bigint, start: string, hasStopOnFirs: boolean = false) => {
  const [a,b]: string[] = start.split(/[, ]/);

  const startPoint: Point = {
    a: BigInt(a),
    b: BigInt(b),
  };

  validator(boardSize, startPoint);
  hamiltonGenerator(boardSize, startPoint, hasStopOnFirs);
}
