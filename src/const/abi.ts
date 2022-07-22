import { FormatTypes, Interface } from "ethers/lib/utils";

const sdABIHumanReadable = [
  "function deposit(uint256 _amount, bool _lock, bool _stake, address _user)",
];
const iface = new Interface(sdABIHumanReadable);
export const SD_ABI = iface.format(FormatTypes.json);

const crvABIHumanReadable = [
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

const ifaceCrv = new Interface(crvABIHumanReadable);
export const CRV_ABI = ifaceCrv.format(FormatTypes.json);

export type SD_FUNCTIONS = "deposit";
