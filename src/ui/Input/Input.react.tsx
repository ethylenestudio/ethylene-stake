import { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsnm } from "utils/clsnm";
import styles from "./Input.module.scss";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  rightEl?: ReactNode;
}

const Input = ({ className, rightEl, ...props }: InputProps) => {
  return (
    <div className="flex relative">
      <input
        className={clsnm(
          "py-4 px-4 rounded-md w-full outline-none focus:outline-none shadow-sm border-1 border-neutral-400 bg-white dark:bg-neutral-900",
          className
        )}
        {...props}
      />
      {rightEl && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          {rightEl}
        </div>
      )}
    </div>
  );
};

export { Input };
