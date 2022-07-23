import { Tab } from "components/Tab/Tab.react";
import { NUMBER_REGEX } from "const";
import { useAuth } from "ethylene/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Input } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import { useTheme } from "hooks";
import { LockNotAuthPlaceholder } from "components/Lock/LockAuthPlaceholder.react";
import { LockContext } from "components/Lock/LockContext";
import { LockView } from "components/Lock/LockView.react";
import { _safe } from "ethylene/utils/_safe";
import { LockBalance } from "components/Lock/LockBalance.react";
import { useLockFn, useMinDy } from "fn";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

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
  const [isStaking, setIsStaking] = useState(false);
  const [isEarning, setIsEarning] = useState(false);
  const [fetcher, setFetcher] = useState(0);

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
  const { minDyDebounce } = useMinDy(setMinDy);
  useEffect(() => {
    if (tab === TabState.EARN) {
      minDyDebounce(getFormattedValue(value));
    }
  }, [value]);

  /**
   * @dev Lock
   */
  const { IAllowance, allowance, IApprove, IDeposit } = useLockFn({
    onDeposit: () => {
      setFetcher(fetcher + 1);
      setValue("");
    },
    value: getFormattedValue(value),
    isEarning: isEarning,
    isStaking: isStaking,
  });

  useEffect(() => {
    if (!auth) {
      return;
    }
    IAllowance.execute();
  }, [auth]);

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

  return (
    <LockContext.Provider value={contextVal}>
      <div className="flex mr-auto">
        <Tab
          selected={tab === TabState.LOCK}
          onClick={() => setTab(TabState.LOCK)}
        >
          <span className="text-inherit">Lock CRV</span>
        </Tab>
        <Tab
          selected={tab === TabState.EARN}
          onClick={() => setTab(TabState.EARN)}
        >
          <span className="text-inherit">Earn CRV</span>
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
              value={minDy}
              onChange={(e) => {
                setMinDy(e.target.value);
              }}
              placeholder="Amount"
            />
            <Button
              textClassName="text-lg"
              className="px-2 py-4 mt-6 w-full text-center justify-center"
              color={theme === "light" ? ButtonColor.black : ButtonColor.white}
            >
              Swap
            </Button>
          </div>
        ) : (
          <LockView IApprove={IApprove} IDeposit={IDeposit} />
        )}
      </div>
    </LockContext.Provider>
  );
};

export { Lock };
