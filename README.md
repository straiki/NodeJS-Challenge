# NodeJS-Challenge

GMC Challenge simple application in NodeJS.

## Instalation

`npm install`

## Usage

Application provides three possible ways how to use it.

### Start as command-line application
`./bin/www --cli [args]`

`--cli` Start CLI mode (no other params required)

`-n, --number [NUMBER]`  Number of results from range 1-100 (Default is 5)

`--keyword [STRING]` Keyword to search (Default is tom)

`-l, --location [PATH]`  Path to folder where to store downloaded images  (Default is downloads)

`-h, --help` Display help and usage details

### Start as webserver
`npm start`

Start with NO arguments. `./bin/www`

Application server will start and listen on port 3000.


### Start as desktop application

`npm start-desktop`

Node-Webkit is required to run this application, it has to be installed and properly set in system path (`mw`).

## Tests
jasmine-node is required to run tests.

`npm tests`