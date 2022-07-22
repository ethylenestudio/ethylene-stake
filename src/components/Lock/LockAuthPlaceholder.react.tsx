import { useConnection } from "ethylene/hooks";
import MetamaskImage from "assets/metamask.png";

export const LockNotAuthPlaceholder = () => {
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
