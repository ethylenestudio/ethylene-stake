import { useCrvBalance } from "components/Lock/LockBalance.react";
import { useLockContext } from "components/Lock/LockContext";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { IContractFunctionInterface } from "ethylene/hooks/useContractFunction";
import { useTheme } from "hooks";
import { Button, Checkbox } from "ui";
import { ButtonColor } from "ui/Button/Button.react";

type LockViewProps = Readonly<{
  IApprove: IContractFunctionInterface;
  IDeposit: IContractFunctionInterface;
}>;

const LockView = ({ IApprove, IDeposit }: LockViewProps) => {
  const { theme } = useTheme();
  const { isStaking, setIsStaking, setIsEarning, isEarning, value } =
    useLockContext();

  const { balance: crvBalance } = useCrvBalance();

  const isDisabled = (balance: BigNumber) => {
    if (!value) return true;
    const _amount = BigNumber.from(parseEther(value));
    return BigNumber.from(_amount).gt(balance);
  };

  return (
    <>
      <div className="flex mt-4">
        <div className="flex items-center mr-4">
          <Checkbox
            isChecked={isStaking}
            onClick={() => setIsStaking(!isStaking)}
          />
          <span className="ml-2">Stake</span>
        </div>
        <div className="flex items-center">
          <Checkbox
            isChecked={isEarning}
            onClick={() => setIsEarning(!isEarning)}
          />
          <span className="ml-2">Earn</span>
        </div>
      </div>
      <div className="mt-6 w-full flex">
        <Button
          loading={IApprove.isLoading}
          disabled={IDeposit.isLoading}
          onClick={() => IApprove.executeAndWait()}
          textClassName="text-lg"
          className="px-2 py-4 mr-1 w-full text-center justify-center"
          color={theme === "light" ? ButtonColor.black : ButtonColor.white}
        >
          Approve CRV
        </Button>
        <Button
          onClick={IDeposit.executeAndWait}
          loading={IDeposit.isLoading}
          disabled={IApprove.isLoading || isDisabled(crvBalance)}
          textClassName="text-lg"
          className="px-2 py-4 ml-1 w-full text-center justify-center"
          color={theme === "light" ? ButtonColor.black : ButtonColor.white}
        >
          Lock
        </Button>
      </div>
    </>
  );
};

export { LockView };
