function uploadData() {

    var dpointer = $('#dpointer').val();
    var dhash = $('#dhash').val();
    
    web3.eth.getGasPrice((e, gasPrice) => {
      if (!e) {
        gasPrice = gasPrice.c[0];
        contract.uploadData.estimateGas({from: web3.eth.defaultAccount}, dpointer, dhash, (er, gas) => {
          if (!er) {
            tx = {
              from: web3.eth.defaultAccount,
              gas: gas,
              gasPrice: gasPrice
            };
            contract.uploadData.sendTransaction({from: web3.eth.defaultAccount}, dpointer, dhash, (error, result) => {
                  if (!error){
                    var a = document.createElement('a');
                    var linkText = document.createTextNode("Successfully added file.");
                    a.appendChild(linkText);
                    a.style.color = 'green';
                    document.getElementById("accountAddress").appendChild(a);
                    document.getElementById("accountAddress").reset();
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

/*
function render() {
    var account = web3.eth.defaultAccount;    
    // Load contract data
    contract.deployed().then(function(instance) {
      //electionInstance = instance;
      instance.auth_ledger(account).then(function(auth_ledger) {
		var dataInfo = $("#datainfo");
		dataInfo.empty();
		  
	  	var dpointer = auth_ledger[0];
	  	var dhash = auth_ledger[1];
	  	var flag = auth_ledger[2];
		  
	  	//render data information
	  	var infoTemplate = "<tr><th>" + flag + "</th><td>" + dpointer + "</td><td>" + dhash + "</td></tr>"
	  	dataInfo.append(infoTemplate);
      });
      
 	  instance.acl_keeper_count(account).then(function(acl_count) {
       	//render auth_ledger information for the current account
	  	var aclInfo = $("#aclinfo");
	  	aclInfo.empty();
	  	var j=0;
	    for (var i = 0; i < acl_count; i++) {
	    	instance.acl_keeper(account, i).then(function(tpaddr) {
	    		instance.aclists(account, tpaddr).then(function(acl) {
	    			j++;
	    			var infoTemplate = "<tr><th>" + j + "</th><td>" + tpaddr + "</td>+<td>" + convertPermission(acl[0]) + "</td><td>" + acl[1] + "</td></tr>"
	    			aclInfo.append(infoTemplate);					
				});
			});
	    }
	  });
	  
    }).catch(function(error) {
      console.warn(error);
    });
}
*/

