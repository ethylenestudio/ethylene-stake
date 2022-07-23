import { EthyleneNetwork } from "ethylene/types/app";

export const ETHEREUM_MAINNET_MOCK: EthyleneNetwork = {
  chainId: "0x539",
  name: "Ethereum Mainnet Mock",
  rpcUrls: ["http://127.0.0.1:8545/"],
  nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
};
