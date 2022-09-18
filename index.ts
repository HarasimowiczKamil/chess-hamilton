#!/usr/bin/env node
import commandLineUsage, {Section, OptionDefinition} from 'command-line-usage';
import commandLineArgs, {OptionDefinition as ArgOptionDefinition} from 'command-line-args';
import commandRunner from './src/command/runner';

const optionList: OptionDefinition[] | ArgOptionDefinition[] = [
  { name: 'boardSize', alias: 'n', type: BigInt, description: 'Szerokość szachownicy' },
  { name: 'start', alias: 's', type: String, description: 'Punkt startowy w formacie a,b np. a,3' },
  { name: 'first', alias: 'f', type: Boolean, description: 'Zatrzymaj na pierwszym znalezisku' },
  { name: 'help', alias: 'h', type: Boolean, description: 'Wyświetla tę pomoc' },
];

const sections: Section[] = [
  {
    header: 'Aplikacja wyszukująca Cykl Hamiltona',
    content: 'Cykl jest wyszukiwany na szachownicy ruchem {italic skoczka szachowego}.',
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

const options = commandLineArgs(optionList);

if (options.help || !options.boardSize || !options.start) {
  console.log(commandLineUsage(sections));
  process.exit();
}

commandRunner(options.boardSize, options.start, options.first);


