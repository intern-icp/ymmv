// experimental model for transferring Mongoose-based contracts from BE to FE

const fs = require('fs');

let importString = '';
let exportString = 'export {\n';
let paths = fs.readdirSync('./server/data/contracts/').map(name => name.slice(0, name.length - 3));

paths.forEach(path => {
  importString += `import * as ${path} from './${path}'\n`;
  exportString += `  ${path},\n`;
  const contract = require(`./server/data/contracts/${path}.js`);
  const contractString = JSON.stringify(contract);
  fs.writeFileSync(`./client/src/contracts/${path}.json`, contractString);
});

fs.writeFileSync('./client/src/contracts/index.js', importString + '\n' + exportString + '}');


// experimental model for functional input rendering mixed with OOP for styles inherintance
// passes values straight from DB Contracts to UI HOC via Styled Components.

const contracts = {};
let styledContracts = "import styled from 'styled-components';\n\n";

paths.forEach(path => {
  const contractName = path.slice(0, path.length - 8);
  contracts[contractName] = JSON.parse(fs.readFileSync(`./client/src/contracts/${path}.json`));
});

Object.keys(contracts).forEach(contractName => {
  styledContracts += `// ---- ${contractName} ----\n\n`
  const contract = contracts[contractName];
  Object.keys(contract).forEach(fieldName => {
    const field = contract[fieldName];
    if (field.inputType) {
      styledContracts += `export const ${fieldName} = styled.input\`\n\`;\n\n`;
    }
  });
});

fs.writeFileSync(`./client/src/styles/inputComponents.js`, styledContracts);