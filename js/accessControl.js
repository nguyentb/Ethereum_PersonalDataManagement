function grantAccess(){
	var cid = document.getElementById("grant_cid").value.toLowerCase();
  var eth_add = document.getElementById("grant_eth").value.toLowerCase();
	var policyType = document.getElementById("grant_policy").value;

	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.grantAccess.estimateGas(cid, eth_add, policyType, {from: web3.eth.defaultAccount}, (er, gas) => {
				if (!er){
					var tx = {
						from: web3.eth.defaultAccount,
						gas: gas,
						gasPrice: gasPrice
					};
					contract.grantAccess.sendTransaction(cid, eth_add, policyType, tx, (err, result) => {
						if (!err){
							var a = document.createElement('a');
							var success = document.createTextNode("Successfully granted access.");
              a.appendChild(success);
              a.style.color = 'green';
							document.getElementById("grant_form").appendChild(a);
							document.getElementById("grant_form").reset();
						} else {
							console.log("Error in transaction");
							console.log(err);
						}
					});
				} else {
					console.log("Error while estimating gas");
					console.log(er);
				}
			});
		} else {
			console.log("Error while estimating gas price");
			console.log(e);
		}
	});
}


function revokeAccess(){
	var cid = document.getElementById("revoke_cid").value.toLowerCase();
  var eth_add = document.getElementById("revoke_eth").value.toLowerCase();
	var policyType = document.getElementById("grant_policy").value;

	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.revokeAccess.estimateGas(cid, eth_add, policyType, {from: web3.eth.defaultAccount}, (er, gas) => {
				if (!er){
					var tx = {
						from: web3.eth.defaultAccount,
						gas: gas,
						gasPrice: gasPrice
					};
					contract.revokeAccess.sendTransaction(cid, eth_add, policyType, tx, (err, result) => {
						if (!err){
							var a = document.createElement('a');
							var success = document.createTextNode("Successfully revoked access right.");
              a.appendChild(success);
              a.style.color = 'green';
							document.getElementById("revoke_form").appendChild(a);
							document.getElementById("revoke_form").reset();
						} else {
							console.log("Error in transaction");
							console.log(err);
						}
					});
				} else {
					console.log("Error while estimating gas");
					console.log(er);
				}
			});
		} else {
			console.log("Error while estimating gas price");
			console.log(e);
		}
	});
}

document.getElementById("grant_button").addEventListener("click", grantAccess);
document.getElementById("revoke_button").addEventListener("click", revokeAccess);
