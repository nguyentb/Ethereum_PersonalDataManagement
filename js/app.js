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
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "requestlist",
      "outputs": [
        {
          "name": "",
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
        }
      ],
      "name": "request_list_count",
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
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "request_list_keeper",
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
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_callerId",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "bytes32"
        }
      ],
      "name": "validateAccess",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_requester",
          "type": "address"
        },
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_permission",
          "type": "uint8"
        }
      ],
      "name": "requestAccess",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

const contractAddress = "0xb6FB8D2adA0df10277cCe382F2d19236d08F26Bc".toLowerCase();
const contract = web3.eth.contract(abi);
const contractInstance = contract.at(contractAddress);
const rest_endpoint = "http://146.169.4.43:8080/BlockchainDatamnt/";

document.getElementById('contractAddr').innerHTML = contractAddress;

async function pageRender(){
  // setup web3 and connect to MetaMask  

  if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	await ethereum.enable();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	document.getElementById('accountAddress').innerHTML = web3.eth.defaultAccount;

	// Render profile information from Resource Server by calling a RESTful API	
	var pName = $("#user_name");
	var pEmail = $("#user_email");
	var pOrganisation = $("#user_org");
	var pAge = $("#user_age");
	var pHeartBeat = $("#user_heartbeat");

	//create a signature of the sender with message = account address
	/*
	var sign;		
	web3.eth.sign(web3.eth.defaultAccount, web3.eth.defaultAccount, function(error, result){
		if(!error) {
			sign = result;
			console.log(JSON.stringify(result));
		} else {
			console.error(error);
		}
	});
	*/	
	var sign = "signature"; //simplify the render function
	
	var rest_addr = rest_endpoint + "render?" + "addr=" + web3.eth.defaultAccount + "&sign=" + sign;

	const response = await fetch(rest_addr);
	const profileJson = await response.json(); //extract JSON from the http response
	// do something with profileJson
	console.log(profileJson);
	
	pName.append(profileJson.firstName);
	pName.append(" ");
	pName.append(profileJson.lastName);
	pAge.append(profileJson.age);
	pEmail.append(profileJson.email);
			
	pOrganisation.append(profileJson.organisation);
	pHeartBeat.append(profileJson.heartbeat);		


	// Render dataset information from Blockchain
	contractInstance.auth_ledger.call(web3.eth.defaultAccount, (err, auth_ledger) => {
	  if (!err) {
	  	var dataInfo = $("#datainfo");
		dataInfo.empty();

	  	var dpointer = auth_ledger[0];
	  	var dhash = auth_ledger[1];
	  	var flag = auth_ledger[2];
		  
	  	//render data information
	  	var infoTemplate = "<tr><td>" + flag + "</td><td>" + dpointer + "</td><td>" + dhash + "</td></tr>"
	  	dataInfo.append(infoTemplate);
  	  } else {
  	  	console.error(err);
  	  }		
    });

    //render auth_ledger information for the current account    
	contractInstance.acl_keeper_count.call(web3.eth.defaultAccount, (err1, acl_count) => {
	  	var aclInfo = $("#aclinfo");
	  	aclInfo.empty();
	  	var j=0;
	    for (var i = 0; i < acl_count; i++) {
	    	contractInstance.acl_keeper.call(web3.eth.defaultAccount, i, (err2, tpaddr) => {
	    		contractInstance.aclists.call(web3.eth.defaultAccount, tpaddr, (err3, acl) => {
	    			j++;
	    			var infoTemplate = "<tr><td>" + j + "</td><td>" + tpaddr + "</td>+<td>" + convertPermission(acl[0]) + "</td><td>" + acl[1] + "</td></tr>"
	    			aclInfo.append(infoTemplate);					
				});
			});
	    }
	});    
	
   	//render auth_ledger information for the current account
	contractInstance.request_list_count.call(web3.eth.defaultAccount, (err1, request_list_count) => {
	  	var pendingInfo = $("#pendinginfo");
	  	pendingInfo.empty();
	  	var j=0;
	    for (var i = 0; i < request_list_count; i++) {
	    	contractInstance.request_list_keeper.call(web3.eth.defaultAccount, i, (err2, requester) => {
	    		contractInstance.requestlist.call(web3.eth.defaultAccount, requester, (err3, per) => {
	    			j++;
	    			if (per != 99){ // haven't been fulfilled
		    			var infoTemplate = "<tr><td>" + j + "</td><td>" + requester + "</td>+<td>" + convertPermission(per) + "</td><td>" + "Time" + "</td></tr>"
	    				pendingInfo.append(infoTemplate);
	    			}
				});
			});
	    }
	});
	
  } else {
	web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9450959fb7da4c1e9f880f577685d095"));
  }
}

pageRender();
