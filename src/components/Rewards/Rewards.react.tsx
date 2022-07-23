import { REWARD_ABI } from "const/abi";
import { REWARD_CONTRACT_ADDRESS } from "const/addresses";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  AddressToIconMapping,
  AddressToNameMapping,
} from "ethylene/constants/tokens";
import {
  useAuth,
  useContract,
  useContractFunction,
  useProvider,
} from "ethylene/hooks";
import { useAddress } from "ethylene/hooks/useAddress";
import { _safe } from "ethylene/utils/_safe";
import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import { formatValue } from "utils/formatValue";
import { GFetcherContext } from "../../../pages/index";
import styles from "./Rewards.module.scss";

interface RewardTokenMappingInterface {
  [key: string]: BigNumber;
}

const Rewards = () => {
  const { provider } = useProvider();
  const auth = useAuth();
  const address = useAddress();
  const rewardContract = useContract<
    | "reward_count"
    | "claimable_reward"
    | "reward_tokens"
    | "claim_rewards"
    | "balanceOf"
  >({
    address: REWARD_CONTRACT_ADDRESS,
    abi: REWARD_ABI,
    provider,
  });

  const [rewardLength, setRewardLength] = useState<number | null>(null);
  const [rewardTokenMapping, setRewardTokenMapping] =
    useState<RewardTokenMappingInterface>({});
  const [totalLocked, setTotalLocked] = useState<BigNumber>(BigNumber.from(0));
  const { gFetcher, setGFetcher } = useContext(GFetcherContext);

  useEffect(() => {
    if (!auth) return;
    const fetch = async () => {
      const res = await rewardContract?.methods.reward_count.execute();
      setRewardLength(Number(res.toString()));
    };
    fetch();
  }, [auth]);

  useEffect(() => {
    if (!auth) return;

    (async function fetch() {
      const res = await rewardContract?.methods.balanceOf.execute(address);
      setTotalLocked(res);
    })();
  }, [auth, gFetcher]);

  useEffect(() => {
    if (!auth || !rewardLength) return;

    const fetch = async (index: number) => {
      const res = await rewardContract?.methods.reward_tokens.execute(index);
      return res;
    };
    const fetchClaimableReward = async (tokenAddress: string) => {
      const res = await rewardContract?.methods.claimable_reward.execute(
        address,
        tokenAddress
      );
      return res;
    };

    const fetchAddreses = async () => {
      let obj: any = {};
      for (let i = 0; i < rewardLength; i++) {
        const _address = await fetch(i);
        const amount = await fetchClaimableReward(_address);
        obj[_address] = amount;
      }
      setRewardTokenMapping(obj);
    };

    fetchAddreses();
  }, [auth, rewardLength, gFetcher]);

  const getObjectKeys = () => {
    const keys = _safe(
      () => Object.keys(rewardTokenMapping),
      () => []
    );
    return keys;
  };
  const keys = getObjectKeys();

  return (
    <>
      {auth ? (
        <div className="flex flex-col w-10/12">
          <h2 className="text-2xl mb-4">Total locked</h2>
          <div>
            <span className="text-lg">
              {_safe(
                () => formatValue(formatEther(totalLocked)),
                () => 0
              )}
            </span>
          </div>

          <h2 className="text-2xl mb-0 mt-8">My rewards</h2>
          {rewardContract?.methods.claimable_reward.isLoading ? (
            <div className="flex flex-1 w-full h-full mt-4 ml-auto mr-auto justify-center md:justify-start">
              <Spinner size={36} />
            </div>
          ) : (
            <div className="flex flex-col w-full justify-between">
              <div className="flex flex-col mt-4">
                <Button
                  onClick={async () => {
                    await rewardContract?.methods.claim_rewards.executeAndWait();
                    setGFetcher(gFetcher + 1);
                  }}
                  loading={rewardContract?.methods.claim_rewards.isLoading}
                  className="w-max mb-8"
                  color={ButtonColor.purple}
                >
                  Claim all
                </Button>
                {keys.map((item: string) => {
                  const _icon = AddressToIconMapping[item];
                  const _name = AddressToNameMapping[item];
                  const _amount = rewardTokenMapping[item];

                  return (
                    <ClaimComponent
                      key={_name}
                      name={_name}
                      icon={_icon}
                      amount={_amount}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center">
          <span>Connect wallet to see your rewards</span>
        </div>
      )}
    </>
  );
};

const ClaimComponent = ({
  name,
  icon,
  amount,
}: {
  name: string;
  icon: string;
  amount: BigNumber;
}) => {
  return (
    <div className="flex items-center mb-4">
      <img className="w-8 mr-4" src={icon} alt={name} />
      <span className="text-xl">{name}</span>
      <span className="ml-5 text-lg">{formatValue(formatEther(amount))}</span>
    </div>
  );
};

export { Rewards };
