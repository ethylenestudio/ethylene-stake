import { Web3Provider } from "@ethersproject/providers";
import { useDispatch } from "react-redux";
import { useEthyleneDispatch, useTypedSelector } from "../store";
import { setProvider as setProviderAction } from "../store/reducers/accountReducer";

export const useProvider = () => {
  const dispatch = useEthyleneDispatch();
  const provider = useTypedSelector((state) => state.account.provider);

  const setProvider = (provider: Web3Provider) => {
    dispatch(setProviderAction(provider));
  };

  return { setProvider, provider };
};
