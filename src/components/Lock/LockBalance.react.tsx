import { TabState } from "components/Lock/Lock.react";
import { useLockContext } from "components/Lock/LockContext";
import { SD_CRV_CONTRACT_ADDRESS, CRV_CONTRACT_ADDRESS } from "const/addresses";
import { formatEther } from "ethers/lib/utils";
import { useAuth, useERC20Balance } from "ethylene/hooks";
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

export const useCrvBalance = () => {
  const { fetcher } = useLockContext();
  const auth = useAuth();

  const { balance, fetchBalance } = useERC20Balance({
    address: CRV_CONTRACT_ADDRESS,
    direct: true,
    deps: [fetcher, auth],
  });

  return {
    component: <span>Balance: {formatBalance(balance)}</span>,
    balance,
    fetchBalance,
  };
};

export const useSDCrvBalance = () => {
  const { fetcher } = useLockContext();
  const auth = useAuth();

  const { balance, fetchBalance } = useERC20Balance({
    address: SD_CRV_CONTRACT_ADDRESS,
    direct: true,
    deps: [fetcher, auth],
  });

  return {
    component: <span>Balance: {formatBalance(balance)}</span>,
    balance,
    fetchBalance,
  };
};
