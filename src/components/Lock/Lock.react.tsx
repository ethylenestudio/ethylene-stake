import { Tab } from "components/Tab/Tab.react";
import { NUMBER_REGEX } from "const";
import { useAuth, useConnection } from "ethylene/hooks";
import { useState } from "react";
import MetamaskImage from "assets/metamask.png";
import { Button, Checkbox, Input } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import { useTheme } from "hooks";

enum TabState {
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
  const [tab, setTab] = useState<TabState>(TabState.LOCK);
  const [value, setValue] = useState<string>("");
  const [isStaking, setIsStaking] = useState(false);
  const [isEarning, setIsEarning] = useState(false);

  return (
    <>
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
        <Input
          placeholder="Amount"
          value={value}
          onChange={(e) => {
            const _value = e.target.value;
            console.log(_value);
            if (!NUMBER_REGEX.test(_value) || _value.includes("-")) {
              return;
            }
            setValue(_value);
          }}
        />
        {tab === TabState.EARN ? (
          <div className="flex flex-col mt-2">
            <Input
              placeholder="Amount"
              onChange={(e) => {
                const _value = e.target.value;
                console.log(_value);
                if (!NUMBER_REGEX.test(_value) || _value.includes("-")) {
                  return;
                }
                setValue(_value);
              }}
            />
          </div>
        ) : (
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
            <Button
              className="px-2 py-4 mt-6 w-full text-center justify-center"
              color={theme === "light" ? ButtonColor.black : ButtonColor.white}
            >
              Swap
            </Button>
          </>
        )}
      </div>
    </>
  );
};

const LockNotAuthPlaceholder = () => {
  const { connect } = useConnection();

  return (
    <div className="h-80 py-5 flex flex-col items-center justify-center font-normal">
      <span className="text-2xl">Connect wallet</span>
      <div
        onClick={() => connect()}
        className="flex flex-col w-40 mt-8 bg-stone-100 hover:bg-neutral-100  dark:bg-neutral-900 hover:dark:bg-zinc-900 px-2 py-4 rounded-md items-center justify-center cursor-pointer"
      >
        <img src={MetamaskImage.src} alt="metamask" className="w-12 mx-auto" />
        <span className="mt-2 text-xl">Metamask</span>
      </div>
    </div>
  );
};

export { Lock };
