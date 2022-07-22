import { EthyleneNetwork } from "ethylene/types/app";

export const ETHEREUM_MAINNET_MOCK: EthyleneNetwork = {
  chainId: "0x7a69",
  name: "Ethereum Mainnet Mock",
  rpcUrls: ["http://localhost:8545/"],
  nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
};
