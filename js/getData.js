const $getDataloc = document.querySelector('#getDataloc');
const $myTokenLoc = document.querySelector('#myTokenLoc');

function downloadableFile_usr(name, fileID, size, data, div) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  const row = document.createElement('tr')

  const nameCell = document.createElement('td')
  nameCell.innerHTML = name

  const idCell = document.createElement('td')
  idCell.innerHTML = fileID

  const sizeCell = document.createElement('td')
  sizeCell.innerText = size

  const downloadCell = document.createElement('td')
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', name)
  link.innerHTML = '<img width=20 class="table-action" src="assets/download.svg" alt="Download" />'
  downloadCell.appendChild(link)

  row.appendChild(nameCell)
  row.appendChild(idCell)
  row.appendChild(sizeCell)
  row.appendChild(downloadCell)

  div.remove();

	$getDataloc.insertBefore(row, $getDataloc.firstChild);
	document.getElementById('empty-row-get').style.display = 'none';
}

function showToken(token){
  const row = document.createElement('tr')

  const tokenCell = document.createElement('td')
  tokenCell.innerHTML = token

  const copyCell = document.createElement('td')
  const link = document.createElement('a')

  link.innerHTML = '<img width=20 class="table-action" src="assets/copy.svg" alt="Copy" />'
	link.addEventListener("click", () => {
		console.log("copy ", token)
		var el = document.createElement('textarea');
	  el.value = token;
	  el.setAttribute('readonly', '');
	  el.style = {position: 'absolute', left: '-9999px'};
	  document.body.appendChild(el);
	  el.select();
		document.execCommand('copy');
	  document.body.removeChild(el);
	})
  copyCell.appendChild(link)
  row.appendChild(tokenCell)
  row.appendChild(copyCell)

	$myTokenLoc.insertBefore(row, $myTokenLoc.firstChild);
	document.getElementById('empty-row-token').style.display = 'none';
}

function waitForToken(txHash,fileID,div) {
  setTimeout(() => {
    web3.eth.getTransaction(txHash, (e,tx) => {
      if (tx != null) {
        console.log(tx);
        console.log('Transaction ' + txHash + ' has been successfully confirmed');
        contract.getTokenCall.call(fileID, (call_err, token) => {
          if(!call_err){
            console.log("Token : ", token);
            div.remove();
            showToken(token);
            document.getElementById("token_form").reset();
          } else {
            console.log(call_err);
          }
        });
        return;
      }
      return waitForToken(txHash, fileID, div);
    });
  }, 10 * 1000);
}


function getToken(){
  var flag = 0;
  var fileID = document.getElementById("user_getdata").value.toLowerCase();
  var policyType = document.getElementById("token_policy").value;

  web3.eth.getGasPrice((e, gasPrice) => {
    if (!e){
      gasPrice = gasPrice.c[0];
      contract.getToken.estimateGas(fileID, policyType, {from: web3.eth.defaultAccount}, (er, gas) => {
        if(!er){
          var tx = {
            from: web3.eth.defaultAccount,
            gas: gas,
            gasPrice: gasPrice
          };
          contract.getToken.sendTransaction(fileID, policyType, tx, async (err, hash) => {
            if(!err){
              contract.getTokenCall.call(fileID, (call_err, token) => {
                if(!call_err){
                  console.log("Token before: ", token);
                  var div = document.createElement('div');
                  div.setAttribute('class', 'loader');
                  document.getElementById('token_form').appendChild(div);
                  waitForToken(hash, fileID, div);
                }else{
                  console.log(call_err);
                }
              });
            }else{
              console.log(err);
            }
          });
        }else{
          console.log(er);
          var a = document.createElement('a');
          var linkText = document.createTextNode("Transaction failed, you don't have access to this file.");
          a.style.color = 'red';
          a.appendChild(linkText);
          document.getElementById("token_form").appendChild(a);
          document.getElementById("token_form").reset();
        }
      });
    }else{
      console.log(e);
    }
  });
}


function getData(){
  var fileID = document.getElementById('redeem_fileID').value.toLowerCase();
  var token = document.getElementById('redeem_token').value.toLowerCase();
  console.log(fileID, token)
  web3.eth.getGasPrice((e, gasPrice) => {
    if (!e){
      gasPrice = gasPrice.c[0];
      contract.validateToken.estimateGas(token, fileID, {from: web3.eth.defaultAccount}, (er, gas) => {
        if(!er){
          var tx = {
            from: web3.eth.defaultAccount,
            gas: gas,
            gasPrice: gasPrice
          };
          contract.validateToken.sendTransaction(token, fileID, tx, (err, result) => {
            if(!err){
              contract.validateToken.call(token, fileID, (error, mapAddress) => {
                if(!error){
                  var div = document.createElement('div');
                  div.setAttribute('class', 'loader');
                  document.getElementById('redeem_form').appendChild(div);
                  console.log("Map address received : ", mapAddress);
                  node.get(mapAddress).then((mapStr) =>{
                    var map = new Map(JSON.parse(mapStr[1].content.toString()));
                    var ipfsAddress = map.get(fileID);
                    console.log("IPFS address of data : ", ipfsAddress);
                    node.get(ipfsAddress).then((file) => {
                      downloadableFile_usr(file[1].name, fileID, file[1].size, file[1].content, div);
                    })
                  });
                }else{
                  console.log(error);
                }
              });
            }else{
              console.log(err);
            }
          })
        }else{
          console.log(er);
          var a = document.createElement('a');
          var linkText = document.createTextNode("Transaction failed, try requesting a new token.");
          a.style.color = 'red';
          a.appendChild(linkText);
          document.getElementById("redeem_form").appendChild(a);
          document.getElementById("redeem_form").reset();
        }
      });
    }else{
      console.log(e);
    }
  });
}

document.getElementById("getdata_button").addEventListener("click", getToken);
document.getElementById("redeem_button").addEventListener("click", getData);
