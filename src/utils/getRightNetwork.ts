import { ETHEREUM_MAINNET_MOCK } from "const/networks";
import { ETHEREUM_MAINNET } from "ethylene/constants";

export const getRightNetwork = () => {
  return process.env.NEXT_PUBLIC_DEV == "true"
    ? ETHEREUM_MAINNET_MOCK
    : ETHEREUM_MAINNET;
};
