export const PoolFactoryABI = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolCreated",
    inputs: [
      {
        type: "address",
        name: "issuer_",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "pool_",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "createPool",
    inputs: [
      {
        type: "address",
        name: "fundAsset_",
        internalType: "address",
      },
      {
        type: "string",
        name: "baseURI_",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "startTimestamp_",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "endTimestamp_",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "targetAmount_",
        internalType: "uint256",
      },
      {
        type: "string[]",
        name: "names_",
        internalType: "string[]",
      },
      {
        type: "uint256[]",
        name: "ids_",
        internalType: "uint256[]",
      },
      {
        type: "uint256[]",
        name: "mintPrices_",
        internalType: "uint256[]",
      },
      {
        type: "uint256[]",
        name: "maxSupplys_",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "pool_",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
