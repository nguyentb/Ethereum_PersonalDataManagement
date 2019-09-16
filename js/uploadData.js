function uploadData() {

    var dpointer = $('#dpointer').val();
    var dhash = $('#dhash').val();
    var account = web3.eth.defaultAccount;
    
    contract.uploadData.sendTransaction(account, dpointer, dhash => {
        var a = document.createElement('a');
        var linkText = document.createTextNode("Successfully added file.");
        a.appendChild(linkText);
        a.style.color = 'green';
        document.getElementById("accountAddress").appendChild(a);
        document.getElementById("accountAddress").reset();
    });
}
