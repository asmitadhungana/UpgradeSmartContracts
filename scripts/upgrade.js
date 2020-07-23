const Web3 = require('web3');
const { Contracts, ProxyAdminProject, ProxyAdmin, ZWeb3 } = require('@openzeppelin/upgrades')

async function main() {
  // Create web3 provider and initialize OpenZeppelin upgrades
  web3 = new Web3('http://localhost:8545');
  ZWeb3.initialize(web3.currentProvider)

  // Create an OpenZeppelin project
  const [from] = await ZWeb3.eth.getAccounts();

  //paste the resp. addresses returned from the deploy script
  const proxyAdminAddress = '0x619d9F259DE5cE03BBcdC3E1F59857858De1B10b';
  const proxyAddress = '0x7bBeaDe4922Ea97213eFB8593ED37bA0D62A9c61';

  const proxyAdmin = ProxyAdmin.fetch(proxyAdminAddress, { from, gas: 1e6, gasPrice: 1e9 })
  const project = new ProxyAdminProject('MyProject', proxyAdmin, null, { from, gas: 1e6, gasPrice: 1e9 });

  // Upgrade it to V2
  console.log('Upgrading to v2...');
  const SimpleStorageV2 = Contracts.getFromLocal('SimpleStorageV2');
  const instanceV2 = await project.upgradeProxy(proxyAddress, SimpleStorageV2);
  console.log(`Contract upgraded at ${instanceV2.options.address}`);

  // And check its new changeValue() method, note that we use instanceV2 since V0 has no changeValue() in its ABI
  await instanceV2.methods.changeValue("add",10).send({ from, gas: 1e5, gasPrice: 1e9 });
  const newValue = await instanceV2.methods.retrieve().call();
  console.log(`Updated value is ${newValue.toString()}\n`);
}

main();