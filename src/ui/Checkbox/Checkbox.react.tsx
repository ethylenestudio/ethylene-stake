import { Icon } from "ui";
import styles from "./Checkbox.module.scss";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

type CheckboxProps = Readonly<{
  isChecked?: boolean;
  onClick: () => void;
}>;

const Checkbox = ({ isChecked, onClick }: CheckboxProps) => {
  return (
    <Icon
      className="text-black dark:text-white cursor-pointer"
      onClick={onClick}
    >
      {isChecked ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
    </Icon>
  );
};

export { Checkbox };
