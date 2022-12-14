# chess-hamilton

## Uruchomienie

Wymagania:
* [node 16](https://nodejs.org/en/download/)
* [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) `npm install --global yarn`

### Instalacja zależności i kompilacja

```bash
yarn install
yarn build
```

### Uruchomienie

```bash
$ node ./index.js

Aplikacja wyszukująca Cykl Hamiltona

  Cykl jest wyszukiwany na szachownicy ruchem skoczka szachowego.

Opcje

  -n, --boardSize bigint   Szerokość szachownicy
  -s, --start string       Punkt startowy w formacie a,b np. 1,3
  -f, --first              Zatrzymaj na pierwszym znalezisku
  -h, --help               Wyświetla tę pomoc

Przykład użycia

  node index.js --boardSize=6 --start=0,0

  node index.js -n 6 -s "0,0" -f

```

## Stats

| Command                     | i9-9900K 32GB HDD WSL2                                                                     | i5-7200U 20GB SSD                                                               |
|-----------------------------|--------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `yarn start -n 6 -s 0,0`    | Przekroczono limit czasu 10800000ms (w sumie 7091 Cykli Hamiltona, 6831 cykl po ok. 6480s) | Przekroczono limit czasu 10800000ms (w sumie 6831 Cykli Hamiltona po ok. 9500s) |
| `yarn start -n 6 -s 0,0 -f` | ~ 4,3076s                                                                                  | ~ 6,3501s                                                                       |
