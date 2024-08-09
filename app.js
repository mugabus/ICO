window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const deployForm = document.getElementById('deployForm');
    const statusDiv = document.getElementById('status');

    if (deployForm) {
        deployForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const tokenAddress = document.getElementById('tokenAddress').value;
            const price = document.getElementById('price').value;
            const priceInWei = web3.utils.toWei(price, 'ether');

            const SaleTokenABI = [
                {
                    "inputs": [
                        {
                            "internalType": "contract ERC20Token",
                            "name": "_tokenContract",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_price",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "buyer",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Sold",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "numberOfTokens",
                            "type": "uint256"
                        }
                    ],
                    "name": "buyTokens",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "endSale",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "price",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "tokenContract",
                    "outputs": [
                        {
                            "internalType": "contract ERC20Token",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "tokensSold",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            const SaleTokenBytecode = '608060405234801561000f575f80fd5b50604051610ec4380380610ec483398181016040528101906100319190610160565b3360025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550815f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600181905550505061019e565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100eb826100c2565b9050919050565b5f6100fc826100e1565b9050919050565b61010c816100f2565b8114610116575f80fd5b50565b5f8151905061012781610103565b92915050565b5f819050919050565b61013f8161012d565b8114610149575f80fd5b50565b5f8151905061015a81610136565b92915050565b5f8060408385031215610176576101756100be565b5b5f61018385828601610119565b92505060206101948582860161014c565b9150509250929050565b610d19806101ab5f395ff3fe608060405260043610610054575f3560e01c80633610724e14610058578063380d831b14610074578063518ab2a81461008a57806355a373d6146100b45780638da5cb5b146100de578063a035b1fe14610108575b5f80fd5b610072600480360381019061006d9190610712565b610132565b005b34801561007f575f80fd5b506100886103f3565b005b348015610095575f80fd5b5061009e610642565b6040516100ab919061074c565b60405180910390f35b3480156100bf575f80fd5b506100c8610648565b6040516100d591906107df565b60405180910390f35b3480156100e9575f80fd5b506100f261066b565b6040516100ff9190610818565b60405180910390f35b348015610113575f80fd5b5061011c610690565b604051610129919061074c565b60405180910390f35b61013e81600154610696565b341461017f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101769061088b565b60405180910390fd5b5f610221825f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101ec573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061021091906108bd565b600a61021c9190610a44565b610696565b9050805f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161027c9190610818565b602060405180830381865afa158015610297573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102bb91906108bd565b10156102fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f390610ad8565b60405180910390fd5b8160035f82825461030d9190610af6565b925050819055507fae92ab4b6f8f401ead768d3273e6bb937a13e39827d19c6376e8fd4512a05d9a3383604051610345929190610b29565b60405180910390a15f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016103a7929190610b29565b6020604051808303815f875af11580156103c3573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103e79190610b85565b6103ef575f80fd5b5050565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610482576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047990610bfa565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff165f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016105379190610818565b602060405180830381865afa158015610552573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061057691906108bd565b6040518363ffffffff1660e01b8152600401610593929190610b29565b6020604051808303815f875af11580156105af573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105d39190610b85565b6105db575f80fd5b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc4790811502906040515f60405180830381858888f1935050505015801561063f573d5f803e3d5ffd5b50565b60035481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b5f8083036106a6575f90506106d5565b5f82846106b39190610c18565b90508284826106c29190610c86565b146106d0576106cf610cb6565b5b809150505b92915050565b5f80fd5b5f819050919050565b6106f1816106df565b81146106fb575f80fd5b50565b5f8135905061070c816106e8565b92915050565b5f60208284031215610727576107266106db565b5b5f610734848285016106fe565b91505092915050565b610746816106df565b82525050565b5f60208201905061075f5f83018461073d565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f6107a76107a261079d84610765565b610784565b610765565b9050919050565b5f6107b88261078d565b9050919050565b5f6107c9826107ae565b9050919050565b6107d9816107bf565b82525050565b5f6020820190506107f25f8301846107d0565b92915050565b5f61080282610765565b9050919050565b610812816107f8565b82525050565b5f60208201905061082b5f830184610809565b92915050565b5f82825260208201905092915050565b7f496e636f72726563742076616c75652073656e740000000000000000000000005f82015250565b5f610875601483610831565b915061088082610841565b602082019050919050565b5f6020820190508181035f8301526108a281610869565b9050919050565b5f815190506108b7816106e8565b92915050565b5f602082840312156108d2576108d16106db565b5b5f6108df848285016108a9565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8160011c9050919050565b5f808291508390505b600185111561096a57808604811115610946576109456108e8565b5b60018516156109555780820291505b808102905061096385610915565b945061092a565b94509492505050565b5f826109825760019050610a3d565b8161098f575f9050610a3d565b81600181146109a557600281146109af576109de565b6001915050610a3d565b60ff8411156109c1576109c06108e8565b5b8360020a9150848211156109d8576109d76108e8565b5b50610a3d565b5060208310610133831016604e8410600b8410161715610a135782820a905083811115610a0e57610a0d6108e8565b5b610a3d565b610a208484846001610921565b92509050818404811115610a3757610a366108e8565b5b81810290505b9392505050565b5f610a4e826106df565b9150610a59836106df565b9250610a867fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484610973565b905092915050565b7f4e6f7420656e6f75676820746f6b656e7320617661696c61626c6500000000005f82015250565b5f610ac2601b83610831565b9150610acd82610a8e565b602082019050919050565b5f6020820190508181035f830152610aef81610ab6565b9050919050565b5f610b00826106df565b9150610b0b836106df565b9250828201905080821115610b2357610b226108e8565b5b92915050565b5f604082019050610b3c5f830185610809565b610b49602083018461073d565b9392505050565b5f8115159050919050565b610b6481610b50565b8114610b6e575f80fd5b50565b5f81519050610b7f81610b5b565b92915050565b5f60208284031215610b9a57610b996106db565b5b5f610ba784828501610b71565b91505092915050565b7f4f6e6c79206f776e65722063616e20656e642073616c650000000000000000005f82015250565b5f610be4601783610831565b9150610bef82610bb0565b602082019050919050565b5f6020820190508181035f830152610c1181610bd8565b9050919050565b5f610c22826106df565b9150610c2d836106df565b9250828202610c3b816106df565b91508282048414831517610c5257610c516108e8565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610c90826106df565b9150610c9b836106df565b925082610cab57610caa610c59565b5b828204905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52600160045260245ffdfea2646970667358221220fb0725522c188ce8f91ce3738d8fab4c674200039c0011f6588b5a283deed83964736f6c634300081a0033';

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
    } else {
        const buyButton = document.getElementById('buyButton');
        const accountSpan = document.getElementById('account');
        const priceSpan = document.getElementById('price');
        const balanceSpan = document.getElementById('balance');
        const numberOfTokensInput = document.getElementById('numberOfTokens');

        const saleTokenAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Replace with your SaleToken contract address
        const SaleTokenABI = [
            {
                "inputs": [
                    {
                        "internalType": "contract ERC20Token",
                        "name": "_tokenContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Sold",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "numberOfTokens",
                        "type": "uint256"
                    }
                ],
                "name": "buyTokens",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "endSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "price",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tokenContract",
                "outputs": [
                    {
                        "internalType": "contract ERC20Token",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tokensSold",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const ERC20ABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        const saleTokenContract = new web3.eth.Contract(SaleTokenABI, saleTokenAddress);

        async function loadData() {
            const accounts = await web3.eth.getAccounts();
            accountSpan.innerHTML = accounts[0];

            const tokenPrice = await saleTokenContract.methods.price().call();
            priceSpan.innerHTML = web3.utils.fromWei(tokenPrice, 'ether');

            const tokenAddress = await saleTokenContract.methods.tokenContract().call();
            const erc20Token = new web3.eth.Contract(ERC20ABI, tokenAddress);
            const balance = await erc20Token.methods.balanceOf(accounts[0]).call();
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
    }
});
