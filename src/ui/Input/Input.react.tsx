import { ComponentPropsWithoutRef } from "react";
import { clsnm } from "utils/clsnm";
import styles from "./Input.module.scss";

interface InputProps extends ComponentPropsWithoutRef<"input"> {}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsnm(
        "py-4 px-4 rounded-md w-full outline-none focus:outline-none shadow-sm border-1 border-neutral-400 bg-white dark:bg-neutral-900",
        className
      )}
      {...props}
    />
  );
};

export { Input };
