let accounts;
window.onload = function(){
    console.log("App is loaded");
}
if(window.ethereum){
    this.ethereum.on('accountschanged',handleAccountsChanged);
    window.ethereum.request({method:'eth_accounts'})
    .then(handleAccountsChanged)
    .catch((err))=>{
        console.log(err);
    });
}
else{
    console.log('metamask');
}
const enableEth = async ()=>{
    accounts = await window.ethereum.request({method: 'eth-requestAccounts'}).catch((err))
    ({
    console.log(err.code);
    })
    console.log(accounts);
}

const checkEthBalance = async ()=> {
    let balance= await window.ethereum.request({method: 'eth_getBalance'}).catch((err))
    params: [
        accounts[0]
    ]
}).catch((err))=> {
    console.log(err);

    balance = parseInt(balance);
    balance=balance/Math.pow(10,20);
    console.log(balance);
}
const sendTransaction = async () => {
    let params = [
        from: accounts[0],
        to: '0x6663184b3521bF1896Ba6e1E776AB94c317204B6',
        gas: Number(25000).toString(16),
        gasPrice: Number(30000).toString(16),
        value: Number(1).toString(16)
    ]
    
    let result = await window.ethereum.request({method:'eth_sendTransaction', params}).catch((err) => {
        console.log(err);
    })
}
const ethers = require('ethers')
const network = 'rinkeby' 
const provider = ethers.getDefaultProvider(network)
const address = '0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB'
provider.getBalance(address).then((balance) => {

 const balanceInEth = ethers.utils.formatEther(balance)
 console.log(`balance: ${balanceInEth} ETH`)
})

const ethers = require('ethers')
const wallet = ethers.Wallet.createRandom()
console.log('address:', wallet.address)
console.log('mnemonic:', wallet.mnemonic.phrase)
console.log('privateKey:', wallet.privateKey)

async function callContract() {
    const iface = new ethers.utils.Interface(['function echo(string message)'])
    const data = iface.encodeFunctionData('echo', ['Hello world!'])
    const tx = {
      to: '0x6663184b3521bF1896Ba6e1E776AB94c317204B6',
      data: data,
      gas: '100000',
      schedule: 'fast'
    }
    const signature = await signRequest(tx)
    const relayTransactionHash = await itx.send('relay_sendTransaction', [
      tx,
      signature
    ])
    console.log(`ITX relay hash: ${relayTransactionHash}`)
    return relayTransactionHash
  }

  const wait = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }
  
  async function waitTransaction(relayTransactionHash) {
    let mined = false
  
    while (!mined) {
      const statusResponse = await itx.send('relay_getTransactionStatus', [
        relayTransactionHash
      ])
  
      if (statusResponse.broadcasts) {
        for (let i = 0; i < statusResponse.broadcasts.length; i++) {
          const bc = statusResponse.broadcasts[i]
          const receipt = await itx.getTransactionReceipt(bc.ethTxHash)
          if (receipt && receipt.confirmations && receipt.confirmations > 1) {
            mined = true
            return receipt
          }
        }
      }
      await wait(1000)
    }
  }
  