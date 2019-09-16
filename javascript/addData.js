// Internal function to convert array to hex string
function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// USER ADDS FILE TO SYSTEM
function userAddData(){
	var userFile = document.getElementById("useradd_file");
  // 1 - add file to IPFS
  node.add({
          path: userFile.files[0].name,
          content: userFile.files[0]
        },
				 { wrapWithDirectory: true }
			 )
    .then((res) => {
      var ipfsAddress = res[1].hash;
      console.log("Added file to IPFS at : ", ipfsAddress);
      // 2 - get file ID by computing SHA-256 hash of IPFS hash
      const encoder = new TextEncoder();
      const data = encoder.encode(ipfsAddress);
      window.crypto.subtle.digest("SHA-256", data).then((fid) => {
        var fileID = ('0x' + buf2hex(fid)).toLowerCase();
        console.log("New file ID : ", fileID);
        // 3 - get map address
        contract.getMapAddress.call((call_err, mapAddress) => {
          if(!call_err){
            console.log("Previous map address : ", mapAddress);
            // 4 - fetch and update the map in IPFS
            node.get(mapAddress).then((mapStr) => {
          		var map = new Map(JSON.parse(mapStr[1].content.toString()));
              map.set(fileID, ipfsAddress);
              var newMapFile = new File([JSON.stringify([...map])], "mapAddress.json");
              node.add({
            					path: newMapFile.name,
            					content: newMapFile
            				},
                  { wrapWithDirectory: true }
                )
            	.then((response) => {
            		var newMapAddress = response[1].hash;
                console.log("New map address : ", newMapAddress);
                // 5 - add the file and update the map adddress on the smart contract
                console.log(fileID,newMapAddress);
                web3.eth.getGasPrice((e, gasPrice) => {
                  if(!e){
                    gasPrice = gasPrice.c[0];
                    contract.userAddData.estimateGas(fileID, newMapAddress, (er, gas) => {
                      if(!er){
                        tx = {
                          from: web3.eth.defaultAccount,
                          gas: gas,
                          gasPrice: gasPrice
                        };
                        contract.userAddData.sendTransaction(fileID, newMapAddress, (error, result) => {
                              if (!error){
                                var a = document.createElement('a');
                                var linkText = document.createTextNode("Successfully added file.");
                                a.appendChild(linkText);
                                a.style.color = 'green';
                                document.getElementById("useradd_form").appendChild(a);
                                document.getElementById("useradd_form").reset();
                              } else {
                                console.log("Error in transaction");
                                console.log(error);
                              }
                            });
                      }else{
                        console.log(er);
                      }
                    });
                  }else{
                    console.log(e);
                  }
                });
          			});
            	}).catch((node_err) => {
            		console.error(node_err)
            	});
          } else {
            console.log(call_err);
          }
        });
      });
    });
}


// SERVICE PROVIDER ADDS USER OWNED FILE IN SYSTEM
function spAddData(){
  var userAddress = document.getElementById("user_eth_address").value.toLowerCase();
  var spFile = document.getElementById("spadd_file");
  // 1 - add file to IPFS
  node.add({
          path: spFile.files[0].name,
          content: spFile.files[0]
        },
				 { wrapWithDirectory: true }
			 )
    .then((res) => {
      var ipfsAddress = res[1].hash;
      console.log("Added file to IPFS at : ", ipfsAddress);
      // 2 - get file ID by computing SHA-256 hash of IPFS hash
      const encoder = new TextEncoder();
      const data = encoder.encode(ipfsAddress);
      window.crypto.subtle.digest("SHA-256", data).then((fid) => {
        var fileID = ('0x' + buf2hex(fid)).toLowerCase();
        console.log("New file ID : ", fileID);
        // 3 - get map address
        contract.getMapAddress.call((call_err, mapAddress) => {
          if(!call_err){
            console.log("Previous map address : ", mapAddress);
            // 4 - fetch and update the map in IPFS
            node.get(mapAddress).then((mapStr) => {
          		var map = new Map(JSON.parse(mapStr[1].content.toString()));
              map.set(fileID, ipfsAddress);
              var newMapFile = new File([JSON.stringify([...map])], "mapAddress.json");
              node.add({
            					path: newMapFile.name,
            					content: newMapFile
            				},
                  { wrapWithDirectory: true }
                )
            	.then((response) => {
            		var newMapAddress = response[1].hash;
                console.log("New map address : ", newMapAddress);
                // 5 - add the file and update the map adddress on the smart contract
                console.log(fileID, newMapAddress);
                web3.eth.getGasPrice((e, gasPrice) => {
                  if(!e){
                    gasPrice = gasPrice.c[0];
                    contract.spAddData.estimateGas(fileID, userAddress, newMapAddress, (er, gas) => {
                      if(!er){
                        tx = {
                          from: web3.eth.defaultAccount,
                          gas: gas,
                          gasPrice: gasPrice
                        };
                        contract.spAddData.sendTransaction(fileID, userAddress, newMapAddress, (error, result) => {
                              if (!error){
                                var a = document.createElement('a');
                                var linkText = document.createTextNode("Successfully added file.");
                                a.appendChild(linkText);
                                a.style.color = 'green';
                                document.getElementById("spadd_form").appendChild(a);
                                document.getElementById("spadd_form").reset();
                              } else {
                                console.log("Error in transaction");
                                console.log(error);
                              }
                            });
                      }else{
                        console.log(er);
                      }
                    });
                  }else{
                    console.log(e);
                  }
                });
          			});
            	}).catch((node_err) => {
            		console.error(node_err)
            	});
          } else {
            console.log(call_err);
          }
        });
      });
    });
}


document.getElementById("useraddbutton").addEventListener("click", userAddData);
document.getElementById("spadduserdatabutton").addEventListener("click", spAddData);
