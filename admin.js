window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const deployForm = document.getElementById('deployForm');
    const statusDiv = document.getElementById('status');

    deployForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const tokenAddress = document.getElementById('tokenAddress').value;
        const price = document.getElementById('price').value;
        const priceInWei = web3.utils.toWei(price, 'ether');

        const SaleTokenABI = [...] // Paste your SaleToken ABI here
        const SaleTokenBytecode = '...' // Paste your SaleToken Bytecode here

        const accounts = await web3.eth.getAccounts();
        const saleTokenContract = new web3.eth.Contract(SaleTokenABI);

        try {
            const deployedContract = await saleTokenContract.deploy({
                data: SaleTokenBytecode,
                arguments: [tokenAddress, priceInWei]
            }).send({ from: accounts[0] });

            statusDiv.innerHTML = `SaleToken deployed at address: ${deployedContract.options.address}`;
        } catch (error) {
            statusDiv.innerHTML = `Error: ${error.message}`;
        }
    });
});
