import { CRV_EXCHANGE_ABI } from "const/abi";
import { CRV_EXCHANGE_ADDRESS } from "const/addresses";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useContract, useProvider } from "ethylene/hooks";
import { _safe } from "ethylene/utils/_safe";
import { useDebounce } from "hooks";
import { formatValue } from "utils/formatValue";

export const useMinDy = (setMinDy: (to: string) => void) => {
  const { provider } = useProvider();

  const CRV_EXCHANGE_CONTRACT = useContract({
    address: CRV_EXCHANGE_ADDRESS,
    abi: CRV_EXCHANGE_ABI,
    provider: provider,
  });

  const minDyDebounce = useDebounce(async (value: BigNumber) => {
    if (!value || Number(formatEther(value)) == 0) {
      setMinDy("");
      return;
    }
    _safe(
      async () => {
        const res = await CRV_EXCHANGE_CONTRACT?.methods.get_dy.execute(
          1,
          0,
          value
        );
        setMinDy(formatValue(formatEther(res)));
      },
      () => setMinDy("")
    );
  }, 300);

  return { minDyDebounce };
};
