import { FormatTypes, Interface } from "ethers/lib/utils";

const sdABIHumanReadable = [
  "function deposit(uint256 _amount, bool _lock, bool _stake, address _user)",
];
const iface = new Interface(sdABIHumanReadable);
export const SD_ABI = JSON.parse(iface.format(FormatTypes.json) as any);

const crvABIHumanReadable = [
  "function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) returns(uint256)",
  "function get_dy(int128 i, int128 j, uint256 dx) view returns(uint256)",
];

const ifaceCrv = new Interface(crvABIHumanReadable);
export const CRV_EXCHANGE_ABI = JSON.parse(
  ifaceCrv.format(FormatTypes.json) as any
);

const rewardAbiHumanReadable = [
  "function claimable_reward(address, address) view returns(uint256)",
  "function reward_tokens(uint256) view returns(address)",
  "function reward_count() view returns(uint256)",
  "function claim_rewards()",
  "function balanceOf(address) view returns(uint256)",
  "function withdraw(uint256, bool)",
];
const ifaceReward = new Interface(rewardAbiHumanReadable);

export const REWARD_ABI = JSON.parse(
  ifaceReward.format(FormatTypes.json) as any
);

export type SD_FUNCTIONS = "deposit";
