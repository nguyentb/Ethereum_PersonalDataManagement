function uploadData() {

    var dpointer = $('#dpointer').val();
    var dhash = $('#dhash').val();
    var account = web3.eth.defaultAccount;
    
    App.contracts.Election.deployed().then(function(instance) {
      return instance.uploadData(App.account, dpointer, dhash);
    }).then(function(result) {
 
    }).catch(function(err) {
      console.error(err);
    });
    
    
    web3.eth.getGasPrice((e, gasPrice) => {
      if (!e) {
        gasPrice = gasPrice.c[0];
        contract.uploadData.estimateGas(account, dpointer, dhash, (er, gas) => {
          if (!er) {
            tx = {
              from: web3.eth.defaultAccount,
              gas: gas,
              gasPrice: gasPrice
            };
            contract.uploadData.sendTransaction(account, dpointer, dhash, (error, result) => {
                  if (!error){
                    var a = document.createElement('a');
                    var linkText = document.createTextNode("Successfully added file.");
                    a.appendChild(linkText);
                    a.style.color = 'green';
                    //document.getElementById("useradd_form").appendChild(a);
                    //document.getElementById("useradd_form").reset();
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
