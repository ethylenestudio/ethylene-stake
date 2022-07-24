import { Tab } from "components/Tab/Tab.react";
import { NUMBER_REGEX } from "const";
import { useAuth, useRightNetwork } from "ethylene/hooks";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Input } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import { useTheme } from "hooks";
import { LockNotAuthPlaceholder } from "components/Lock/LockAuthPlaceholder.react";
import { LockContext } from "components/Lock/LockContext";
import { LockView } from "components/Lock/LockView.react";
import { _safe } from "ethylene/utils/_safe";
import {
  LockBalance,
  useSDCrvBalance,
} from "components/Lock/LockBalance.react";
import { useLockFn, useMinDy } from "fn";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { formatValue } from "utils/formatValue";
import { GFetcherContext } from "../../../pages/index";
import { getRightNetwork } from "utils/getRightNetwork";

export enum TabState {
  "EARN",
  "LOCK",
}

const Lock = () => {
  const auth = useAuth();

  return (
    <div className="flex px-8 py-4 flex-col bg-neutral-0 shadow-md dark:bg-zinc-800 w-full rounded-lg">
      {auth ? <LockAuthContent /> : <LockNotAuthPlaceholder />}
    </div>
  );
};

const LockAuthContent = () => {
  const { theme } = useTheme();
  const auth = useAuth();
  const [tab, setTab] = useState<TabState>(TabState.LOCK);
  const [value, setValue] = useState<string>("");
  const [minDy, setMinDy] = useState<string>("");
  const [isStaking, setIsStaking] = useState(true);
  const [isEarning, setIsEarning] = useState(false);
  const [fetcher, setFetcher] = useState(0);
  const { gFetcher, setGFetcher } = useContext(GFetcherContext);
  const { isRightNetwork } = useRightNetwork(getRightNetwork());

  useEffect(() => {
    setValue("");
    setMinDy("");
  }, [tab]);

  const getFormattedValue = (value: string) => {
    try {
      if (!value) {
        return null;
      }
      return parseEther(value);
    } catch {
      return BigNumber.from(0);
    }
  };

  /**
   * @dev Get output amount
   */
  const { minDyDebounce, loading: dyReqLoading } = useMinDy(setMinDy);
  useEffect(() => {
    if (tab === TabState.EARN) {
      minDyDebounce(getFormattedValue(value));
    }
  }, [value]);

  const getMinDy = () => {
    const _minDy = Number(minDy);

    return parseEther(String(_minDy * 0.99));
  };

  const { IAllowance, IApprove, IDeposit, IExchange, IApproveSd } = useLockFn({
    onDeposit: () => {
      setFetcher(fetcher + 1);
      setValue("");
      setGFetcher(gFetcher + 1);
    },
    onExchange: () => {
      setFetcher(fetcher + 1);
      setValue("");
    },
    value: getFormattedValue(value),
    isEarning: isEarning,
    isStaking: isStaking,
    dx: getFormattedValue(value),
    min_dy: getMinDy(),
  });

  useEffect(() => {
    if (!auth || !isRightNetwork) {
      return;
    }
    IAllowance.execute();
  }, [auth, isRightNetwork]);

  const contextVal = useMemo(
    () => ({
      isEarning,
      isStaking,
      setIsEarning,
      setIsStaking,
      value,
      setValue,
      tab,
      fetcher,
    }),
    [
      isStaking,
      isEarning,
      setIsEarning,
      setIsStaking,
      value,
      setValue,
      tab,
      fetcher,
    ]
  );

  const { balance: SDCRVBalance } = useSDCrvBalance();

  const isDisabled = (balance: BigNumber) => {
    if (!value) return true;
    const _amount = BigNumber.from(parseEther(value));
    return BigNumber.from(_amount).gt(balance);
  };

  return (
    <LockContext.Provider value={contextVal}>
      <div className="flex mr-auto">
        <Tab
          selected={tab === TabState.LOCK}
          onClick={() => setTab(TabState.LOCK)}
        >
          <span className="text-inherit">Mint and Stake sdCRV</span>
        </Tab>
        <Tab
          selected={tab === TabState.EARN}
          onClick={() => setTab(TabState.EARN)}
        >
          <span className="text-inherit">sdCRV to CRV</span>
        </Tab>
      </div>
      <div className="mt-4">
        <LockBalance />
        <div className="mt-1"></div>
        <Input
          rightEl={<span>{tab === TabState.LOCK ? "CRV" : "sdCRV"}</span>}
          placeholder="Amount"
          value={value}
          onChange={(e) => {
            const _value = e.target.value;
            if (!NUMBER_REGEX.test(_value) || _value.includes("-")) {
              return;
            }
            setValue(_value);
          }}
        />
        {tab === TabState.EARN ? (
          <div className="flex flex-col mt-2">
            <Input
              rightEl={<span>{"CRV"}</span>}
              disabled
              value={formatValue(minDy)}
              onChange={(e) => {
                setMinDy(e.target.value);
              }}
              placeholder="Output"
            />
            <div className="flex mt-6">
              <Button
                loading={IApproveSd.isLoading}
                disabled={IExchange.isLoading}
                onClick={IApproveSd.executeAndWait}
                textClassName="text-lg"
                className="px-2 py-4 mr-1 w-full text-center justify-center"
                color={
                  theme === "light" ? ButtonColor.black : ButtonColor.white
                }
              >
                Approve sdCRV
              </Button>
              <Button
                loading={IExchange.isLoading}
                disabled={
                  dyReqLoading ||
                  IApproveSd.isLoading ||
                  isDisabled(SDCRVBalance)
                }
                onClick={IExchange.executeAndWait}
                textClassName="text-lg"
                className="px-2 py-4 ml-1 w-full text-center justify-center"
                color={
                  theme === "light" ? ButtonColor.black : ButtonColor.white
                }
              >
                Swap
              </Button>
            </div>
          </div>
        ) : (
          <LockView IApprove={IApprove} IDeposit={IDeposit} />
        )}
      </div>
    </LockContext.Provider>
  );
};

export { Lock };
