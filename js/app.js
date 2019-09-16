const abi = [
{
  "constant": true,
  "inputs": [],
  "name": "blockHashNow",
  "outputs": [
    {
      "name": "",
      "type": "bytes32"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    },
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "acl_keeper",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "name": "acl_keeper_count",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "bytes32"
    }
  ],
  "name": "tokenlist",
  "outputs": [
    {
      "name": "ownerID",
      "type": "address"
    },
    {
      "name": "tpID",
      "type": "address"
    },
    {
      "name": "permission",
      "type": "uint256"
    },
    {
      "name": "issued_at",
      "type": "uint256"
    },
    {
      "name": "expired_in",
      "type": "uint256"
    },
    {
      "name": "refresh_count",
      "type": "uint256"
    },
    {
      "name": "validity",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "blockNumber",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "name": "auth_ledger",
  "outputs": [
    {
      "name": "dataPointer",
      "type": "string"
    },
    {
      "name": "dataHash",
      "type": "string"
    },
    {
      "name": "flag",
      "type": "uint8"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    },
    {
      "name": "",
      "type": "address"
    }
  ],
  "name": "aclists",
  "outputs": [
    {
      "name": "permission",
      "type": "uint8"
    },
    {
      "name": "token",
      "type": "bytes32"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "_address",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "_dataPointer",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "_dataHash",
      "type": "string"
    }
  ],
  "name": "uploadDataEvent",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "token",
      "type": "bytes32"
    }
  ],
  "name": "grantAccessEvent",
  "type": "event"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    },
    {
      "name": "_dataPointer",
      "type": "string"
    },
    {
      "name": "_dataHash",
      "type": "string"
    }
  ],
  "name": "uploadData",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    },
    {
      "name": "_thirdparty",
      "type": "address"
    },
    {
      "name": "_permission",
      "type": "uint8"
    }
  ],
  "name": "grantAccess",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}
];

const contractAddress = "0x9774A0A9A7CDbe862b231adA8887b4a0045A7894".toLowerCase();

document.getElementById('contractAddr').innerHTML = contractAddress;
//const $myDataloc = document.querySelector('#myDataloc');

const cont = window.web3.eth.contract(abi);
const contract = cont.at(contractAddress);


async function setup(){
  // setup web3 and connect to MetaMask
  if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	await ethereum.enable();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	document.getElementById('accountAddress').innerHTML = web3.eth.defaultAccount;
	contract.getMyData.call((e,myData) => {
	  if (!e){
				for (i=0;i<myData.length;i++){
					downloadableFile(myData[i]);
	    }
			} else {
				console.log(e);
			}
		});
  } else {
	web3 = new Web3(new Web3.providers.HttpProvider("rinkeby.infura.io/v3/9450959fb7da4c1e9f880f577685d095"));
  }

}

setup();
