import {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import { Spinner } from "ui/Spinner/Spinner.react";
import { clsnm } from "utils/clsnm";
import styles from "./Button.module.scss";

export enum ButtonColor {
  "white",
  "black",
  "purple",
}

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "color"> {
  color: ButtonColor;
  leftEl?: ReactNode;
  rightEl?: ReactNode;
  textClassName?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  className,
  children,
  color,
  leftEl,
  rightEl,
  textClassName,
  loading,
  disabled,
  ...props
}: Props): ReactElement => {
  const colorClassNames = useMemo((): string[] => {
    const classNames = getColorClassName(color);
    return Object.keys(classNames).map(
      (key: string): string => (classNames as any)[key]
    );
  }, [color]);

  return (
    <button
      className={clsnm(
        "px-3 py-1.5 radius rounded-md flex items-center",
        ...colorClassNames,
        disabled && "opacity-50 pointer-events-none",
        loading && "opacity-100 pointer-events-none",
        className
      )}
      {...props}
    >
      {leftEl && <span className="mr-2 text-inherit">{leftEl}</span>}
      <span className={clsnm("text-inherit", textClassName)}>{children}</span>
      {rightEl && <span className="ml-2 text-inherit">{rightEl}</span>}
      {loading && (
        <div className="ml-2">
          <Spinner size={16} />
        </div>
      )}
    </button>
  );
};

//Helpers

type ButtonClassNames = Readonly<{
  _color: string;
  _textColor: string;
  _hoverColor: string;
  _activeColor: string;
}>;

const getColorClassName = (color: ButtonColor): ButtonClassNames => {
  let _color = "bg-white";
  let _textColor = "text-neutral-900";
  let _hoverColor = "hover:bg-neutral-0";
  let _activeColor = "active:bg-neutral-100";
  if (color === ButtonColor.black) {
    _color = "bg-neutral-800";
    _textColor = "text-white";
    _hoverColor = "hover:bg-neutral-700";
    _activeColor = "active:bg-neutral-600";
  } else if (color === ButtonColor.purple) {
    _color = "bg-indigo-500";
    _textColor = "text-white";
    _hoverColor = "hover:bg-indigo-600";
    _activeColor = "active:bg-indigo-700";
  }

  return { _color, _textColor, _hoverColor, _activeColor };
};

export { Button };
