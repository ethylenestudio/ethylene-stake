import { TabState } from "components/Lock/Lock.react";
import { useLockContext } from "components/Lock/LockContext";
import {
  CRV_DEPOSITOR_CONTRACT_ADDRESS,
  CRV_TOKEN_ADDRESS,
} from "const/addresses";
import { formatEther } from "ethers/lib/utils";
import { useERC20Balance } from "ethylene/hooks";
import { _safe } from "ethylene/utils/_safe";
import { Button, ButtonColor } from "ui/Button/Button.react";
import { formatBalance } from "utils/formatBalance";

export const LockBalance = () => {
  const { setValue, tab } = useLockContext();

  const { balance: CRVBalance, component: CRVBalanceComponent } =
    useCrvBalance();
  const { balance: SDCRVBalance, component: SDCRVBalanceComponent } =
    useSDCrvBalance();

  return (
    <>
      {tab === TabState.LOCK ? (
        <>
          <div className="flex justify-between items-center">
            {CRVBalanceComponent}
            <Button
              onClick={() => {
                _safe(() => {
                  setValue(String(formatEther(CRVBalance)));
                });
              }}
              textClassName="text-sm"
              color={ButtonColor.black}
            >
              Max
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center">
          <>
            {SDCRVBalanceComponent}
            <Button
              onClick={() => {
                _safe(() => {
                  setValue(String(formatEther(SDCRVBalance)));
                });
              }}
              textClassName="text-sm"
              color={ButtonColor.black}
            >
              Max
            </Button>
          </>
        </div>
      )}
    </>
  );
};

const useCrvBalance = () => {
  const { balance, fetchBalance } = useERC20Balance({
    address: CRV_TOKEN_ADDRESS,
    direct: true,
  });

  return { component: <span>Balance: {formatBalance(balance)}</span>, balance };
};

const useSDCrvBalance = () => {
  const { balance, fetchBalance } = useERC20Balance({
    address: CRV_DEPOSITOR_CONTRACT_ADDRESS,
    direct: true,
  });

  return { component: <span>Balance: {formatBalance(balance)}</span>, balance };
};
