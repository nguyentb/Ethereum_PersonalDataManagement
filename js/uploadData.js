async function uploadData() {
	
	//const rest_endpoint = "http://localhost:7070/";
	//const rest_function = "upload?";
	
    var pfname = $('#pfname').val();
    var plname = $('#plname').val();
    var porg = $('#porg').val();
    var page = $('#puserage').val();
    var pheartbeat = $('#pheartbeat').val();
    var pemail = $('#pemail').val();
    
    var payload = {
    	"ownerAddr": web3.eth.defaultAccount,
    	"firstName": pfname,
    	"lastName": plname,
    	"organisation": porg,
    	"age": page,
    	"heartbeat": pheartbeat,
    	"email": pemail
    };
     
    // Upload data to resource server
	//const userAction = async () => {
		const rest_addr = rest_endpoint + "upload?";
		const response = await fetch(rest_addr, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload) // string or object	
		});
	
		const myJson = await response.json(); //extract JSON from the http response
		// do something with myJson
		console.log("upload data invoked");
		console.log(myJson);
		
		// Get info from Blockchain
		web3.eth.getGasPrice((e, gasPrice) => {
		  if(!e){
		    gasPrice = gasPrice.c[0];
		    contractInstance.uploadData.estimateGas(web3.eth.defaultAccount, myJson.dataPointer, myJson.timestamp, (er, gas) => {
		      if(!er){
		        tx = {
		          from: web3.eth.defaultAccount,
		          gas: gas,
		          gasPrice: gasPrice
		        };
		        contractInstance.uploadData.sendTransaction(web3.eth.defaultAccount, myJson.dataPointer, myJson.timestamp, (error, result) => {
		              if (!error){
		                var a = document.createElement('a');
		                var linkText = document.createTextNode("Successfully added file.");
		                a.appendChild(linkText);
		                a.style.color = 'green';
		                document.getElementById("alert_info").appendChild(a);
		                //document.getElementById("alert_info").reset();
		              } else {
		                console.log("Error in transaction");
		                console.log(error);
		              }
		            });
		      } else {
		        console.log(er);
		      }
		    });
		  } else {
		    console.log(e);
		  }
	  });    
    //}	
};



async function readData(){
  // setup web3 and connect to MetaMask
  if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	await ethereum.enable();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	document.getElementById('accountAddress').innerHTML = web3.eth.defaultAccount;

	var req_ownerAddr = $('#req_ownerAddr').val();

	var pName = $("#req_user_name");
	var pEmail = $("#req_user_email");
	var pOrganisation = $("#req_user_org");
	var pAge = $("#req_user_age");
	var pHeartBeat = $("#req_user_heartbeat");
	
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
	var sign = "signature";
	
	var rest_addr = rest_endpoint + "read?" + "reqAddr=" + web3.eth.defaultAccount + "&reqSign=" + sign + "&ownerAddr=" + req_ownerAddr;
	const response = await fetch(rest_addr);
	const profileJson = await response.json(); //extract JSON from the http response
	console.log(profileJson);
	// do something with profileJson	
	if (profileJson != null) {
		pName.append(profileJson.firstName);
		pName.append(" ");
		pName.append(profileJson.lastName);
		pAge.append(profileJson.age);
		pEmail.append(profileJson.email);
		pOrganisation.append(profileJson.organisation);
		pHeartBeat.append(profileJson.heartbeat);
	} else {
        var warning = document.createElement('warning');
        var warningText = document.createTextNode("Access Denied or Data not found !!!");
        warning.appendChild(warningText);
        warning.style.color = 'red';
        document.getElementById("alert_info").appendChild(warning);
	}	
  }
}

function grantAccess() {
	
    var perSelect = $('#permissionSelect').val();
	var tpaddress = $('#tpaddress').val();
	var select = 0;
	
	// Check whether the input address is valid
	/*
	if (isAddress(tpaddress)) {
		alert("true");
	} else {
		alert("false");
	}	
	*/
	
	// Convert multiple select to uint	
	for (var i=0; i<perSelect.length; i++) {
		select += parseInt(perSelect[i]);
	}
	
	web3.eth.getGasPrice((e, gasPrice) => {
      if(!e){
        gasPrice = gasPrice.c[0];
        contractInstance.grantAccess.estimateGas(web3.eth.defaultAccount, tpaddress, select, (er, gas) => {
          if(!er){
            tx = {
              from: web3.eth.defaultAccount,
              gas: gas,
              gasPrice: gasPrice
            };
            contractInstance.grantAccess.sendTransaction(web3.eth.defaultAccount, tpaddress, select, (error, result) => {
                  if (!error){
                    var a = document.createElement('a');
                    var linkText = document.createTextNode("Successfully granted the permission.");
                    a.appendChild(linkText);
                    a.style.color = 'red';
                    document.getElementById("alert_info").appendChild(a);
                    //document.getElementById("alert_info").reset();
                  } else {
                    console.log("Error in transaction");
                    console.log(error);
                  }
                });
          } else {
            console.log(er);
          }
        });
      } else {
        console.log(e);
      }
    });
};

function requestAccess() {
	
    var perSelect = $('#perRequestSelect').val();
	var ownerId = $('#ownerId').val();
	var select = 0;
	
	// Check whether the input address is valid
	/*
	if (isAddress(tpaddress)) {
		alert("true");
	} else {
		alert("false");
	}	
	*/
	
	// Convert multiple select to uint	
	for (var i=0; i<perSelect.length; i++) {
		select += parseInt(perSelect[i]);
	}
	
	web3.eth.getGasPrice((e, gasPrice) => {
      if(!e){
        gasPrice = gasPrice.c[0];
        contractInstance.requestAccess.estimateGas(web3.eth.defaultAccount, ownerId, select, (er, gas) => {
          if(!er){
            tx = {
              from: web3.eth.defaultAccount,
              gas: gas,
              gasPrice: gasPrice
            };
            contractInstance.requestAccess.sendTransaction(web3.eth.defaultAccount, ownerId, select, (error, result) => {
                  if (!error){
                    var a = document.createElement('a');
                    var linkText = document.createTextNode("Successfully request the permission.");
                    a.appendChild(linkText);
                    a.style.color = 'red';
                    document.getElementById("alert_info").appendChild(a);
                    //document.getElementById("alert_info").reset();
                  } else {
                    console.log("Error in transaction");
                    console.log(error);
                  }
                });
          } else {
            console.log(er);
          }
        });
      } else {
        console.log(e);
      }
    });
}
