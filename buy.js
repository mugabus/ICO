window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const saleTokenAddress = 'YOUR_SALE_TOKEN_CONTRACT_ADDRESS'; // Replace with your SaleToken contract address
    const SaleTokenABI = [...] // Paste your SaleToken ABI here

    const accountSpan = document.getElementById('account');
    const priceSpan = document.getElementById('price');
    const balanceSpan = document.getElementById('balance');
    const numberOfTokensInput = document.getElementById('numberOfTokens');
    const buyButton = document.getElementById('buyButton');
    const statusDiv = document.getElementById('status');

    const saleTokenContract = new web3.eth.Contract(SaleTokenABI, saleTokenAddress);

    async function loadData() {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        accountSpan.innerHTML = account;

        const tokenPrice = await saleTokenContract.methods.price().call();
        priceSpan.innerHTML = web3.utils.fromWei(tokenPrice, 'ether');

        const tokenAddress = await saleTokenContract.methods.tokenContract().call();
        const ERC20ABI = [...] // Paste your ERC20 ABI here
        const erc20Contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
        const balance = await erc20Contract.methods.balanceOf(account).call();
        balanceSpan.innerHTML = web3.utils.fromWei(balance, 'ether');
    }

    loadData();

    buyButton.addEventListener('click', async () => {
        const numberOfTokens = numberOfTokensInput.value;
        const tokenPrice = await saleTokenContract.methods.price().call();
        const value = web3.utils.toWei((numberOfTokens * web3.utils.fromWei(tokenPrice, 'ether')).toString(), 'ether');

        try {
            await saleTokenContract.methods.buyTokens(numberOfTokens).send({ from: accountSpan.innerHTML, value: value });
            statusDiv.innerHTML = 'Transaction successful!';
            loadData(); // Update balance after purchase
        } catch (error) {
            statusDiv.innerHTML = `Transaction failed: ${error.message}`;
        }
    });
});
