export const SUPPORTED_NETWORKS: {
  [key: string]: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
} = {
  "0x1": {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3"],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  "0x4": {
    chainId: "0x4",
    chainName: "Rinekby",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [
      "https://eth-rinkeby.alchemyapi.io/v2/qt9AkXcbC7x1hTqKumB1Zd7AP0Fn0xnX",
    ],
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
  },
  "0x89": {
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"], //['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  "0x42": {
    chainId: "0x42",
    chainName: "OKExChain",
    nativeCurrency: {
      name: "OKEx Token",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchainrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/okexchain"],
  },
  "0xA4B1": {
    chainId: "0xA4B1",
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io/"],
  },
  "0xFA": {
    chainId: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/fantom"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  "0x38": {
    chainId: "0x38",
    chainName: "BSC",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  "0x63564C40": {
    chainId: "0x63564C40",
    chainName: "Harmony",
    nativeCurrency: {
      name: "One Token",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: [
      "https://api.harmony.one",
      "https://s1.api.harmony.one",
      "https://s2.api.harmony.one",
      "https://s3.api.harmony.one",
    ],
    blockExplorerUrls: ["https://explorer.harmony.one/"],
  },
  "0xA86A": {
    chainId: "0xA86A",
    chainName: "Avalanche",
    nativeCurrency: {
      name: "Avalanche Token",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
  },
  "0x64": {
    chainId: "0x64",
    chainName: "xDai",
    nativeCurrency: {
      name: "xDai Token",
      symbol: "xDai",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.xdaichain.com"],
    blockExplorerUrls: ["https://blockscout.com/poa/xdai"],
  },
};
