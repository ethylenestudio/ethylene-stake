import { useLockContext } from "components/Lock/LockContext";
import { SD_ABI } from "const/abi";
import {
  CRV_CONTRACT_ADDRESS,
  DEPOSITOR_CONTRACT_ADDRESS,
} from "const/addresses";
import { BigNumber, constants } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ERC20 } from "ethylene/abi";
import { useContractFunction } from "ethylene/hooks";
import { useAddress } from "ethylene/hooks/useAddress";
import { IContractFunctionInterface } from "ethylene/hooks/useContractFunction";
import { useState } from "react";

export const useLockFn = ({
  onDeposit,
  value,
  isStaking,
  isEarning,
}: {
  onDeposit: () => void;
  value: BigNumber | null;
  isStaking: boolean;
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
    onSuccess() {
      onDeposit?.();
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

  const allowance = useContractFunction<BigNumber>({
    address: CRV_CONTRACT_ADDRESS,
    abi: ERC20,
    method: "allowance",
    args: [address, DEPOSITOR_CONTRACT_ADDRESS],
    onSuccess: (res) => {
      setAllowanceVal(res);
    },
  });

  return {
    IDeposit: !value
      ? ({
          executeAndWait: () => undefined,
          execute: () => undefined,
          isLoading: false,
          isFailed: false,
        } as IContractFunctionInterface)
      : deposit,
    IApprove: approve,
    IAllowance: allowance,
    allowance: allowanceVal,
    setAllowance: setAllowanceVal,
  };
};
