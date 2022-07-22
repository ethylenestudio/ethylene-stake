import { ReactNode } from "react";
import { clsnm } from "utils/clsnm";

type Props = Readonly<{
  onClick: () => void;
  children: ReactNode;
  selected: boolean;
}>;

const Tab = ({ onClick, children, selected }: Props) => {
  return (
    <button
      className={clsnm(
        "mr-1 ml-1 rounded-md py-1 px-2 dark:text-white text-md",
        selected && "bg-black dark:bg-white text-white dark:text-black "
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export { Tab };
