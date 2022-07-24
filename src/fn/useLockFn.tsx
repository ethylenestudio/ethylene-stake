import { CRV_EXCHANGE_ABI, SD_ABI } from "const/abi";
import {
  CRV_CONTRACT_ADDRESS,
  CRV_EXCHANGE_ADDRESS,
  DEPOSITOR_CONTRACT_ADDRESS,
  SD_CRV_CONTRACT_ADDRESS,
} from "const/addresses";
import { BigNumber, constants } from "ethers";
import { ERC20 } from "ethylene/abi";
import { useContractFunction } from "ethylene/hooks";
import { useAddress } from "ethylene/hooks/useAddress";
import { IContractFunctionInterface } from "ethylene/hooks/useContractFunction";
import { useState } from "react";
import { toast } from "react-toastify";

export const useLockFn = ({
  onDeposit,
  onExchange,
  value,
  dx,
  min_dy,
  isStaking,
  isEarning,
}: {
  onDeposit: () => void;
  onExchange: () => void;
  value: BigNumber | null;
  isStaking: boolean;
  dx: BigNumber | null;
  min_dy: BigNumber;
  isEarning: boolean;
}) => {
  const address = useAddress();
  const [allowanceVal, setAllowanceVal] = useState<BigNumber>(
    BigNumber.from(0)
  );

  const deposit = useContractFunction({
    address: DEPOSITOR_CONTRACT_ADDRESS,
    abi: SD_ABI,
    method: "deposit",
    args: [value, isEarning, isStaking, address],
    onSuccess: () => {
      onDeposit?.();
    },
    onError: (err) => {
      try {
        if (err.code === 4001) {
          return;
        }
        toast("Deposit failed. Make sure the CRV tokens to be approved");
      } catch (err) {
        toast("Deposit failed");
      }
    },
  });

  const exchange = useContractFunction({
    address: CRV_EXCHANGE_ADDRESS,
    abi: CRV_EXCHANGE_ABI,
    method: "exchange",
    args: [1, 0, dx, min_dy],
    onSuccess() {
      onExchange?.();
    },
    onError: (err) => {
      try {
        if (err.code === 4001) {
          return;
        }
        toast("Swap failed. Make sure the sdCRV tokens to be approved");
      } catch (err) {
        toast("Swap failed");
      }
    },
  });

  const approve = useContractFunction({
    address: CRV_CONTRACT_ADDRESS,
    abi: ERC20,
    method: "approve",
    args: [DEPOSITOR_CONTRACT_ADDRESS, constants.MaxUint256],
    onSuccess: () => {
      allowance.execute();
    },
  });

  const approveSd = useContractFunction({
    address: SD_CRV_CONTRACT_ADDRESS,
    abi: ERC20,
    method: "approve",
    args: [CRV_EXCHANGE_ADDRESS, constants.MaxUint256],
    onSuccess: () => {
      allowance.execute();
    },
  });

  const allowance = useContractFunction<BigNumber>({
    address: CRV_CONTRACT_ADDRESS,
    abi: ERC20,
    method: "allowance",
    args: [address, DEPOSITOR_CONTRACT_ADDRESS],
    onSuccess: (res) => {
      setAllowanceVal(res);
    },
  });

  const empty: IContractFunctionInterface = {
    executeAndWait: () => undefined,
    execute: () => undefined,
    isLoading: false,
    isFailed: false,
  };

  return {
    IDeposit: !value ? empty : deposit,
    IApprove: approve,
    IApproveSd: approveSd,
    IAllowance: allowance,
    IExchange: !dx ? empty : exchange,
    allowance: allowanceVal,
    setAllowance: setAllowanceVal,
  };
};
