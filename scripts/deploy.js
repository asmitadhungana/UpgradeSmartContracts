const Web3 = require('web3');
const { Contracts, ProxyAdminProject, ZWeb3 } = require('@openzeppelin/upgrades')

async function main() {
  // Create web3 provider and initialize OpenZeppelin upgrades
  web3 = new Web3('http://localhost:8545');
  ZWeb3.initialize(web3.currentProvider)

  // Create an OpenZeppelin project
  const [from] = await ZWeb3.eth.getAccounts();
  const project = new ProxyAdminProject('MyProject', null, null, { from, gas: 1e6, gasPrice: 1e9 });

  // Deploy an instance of MyContractV0
  console.log('Creating an upgradeable instance of SimpleStorage...');
  const SimpleStorage = Contracts.getFromLocal('SimpleStorage');
  const instance = await project.createProxy(SimpleStorage);
  const address = instance.options.address;
  console.log(`ProxyAdmin at ${project.proxyAdmin.address}`)
  console.log(`Contract created at ${address}`);

  // And check its initial value
  const initialValue = await instance.methods.retrieve().call();
  console.log(`Initial value is ${initialValue.toString()}\n`);
}

main();