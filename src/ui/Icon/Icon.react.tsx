import { useTheme } from "hooks";
import { ComponentPropsWithoutRef } from "react";
import { clsnm } from "utils/clsnm";

interface IconProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
  hoverable?: boolean;
  hoverSize?: number;
  borderRadius?: string;
  hoverPadding?: string;
}

const Icon = ({
  size = 20,
  children,
  style = {},
  className,
  hoverable,
  hoverSize,
  hoverPadding = "4px",
  borderRadius = "4px",
  ...props
}: IconProps) => {
  const { theme } = useTheme();

  let mainStyles = {
    fontSize: `${size}px`,
    borderRadius: borderRadius,
    padding: hoverPadding,
    ...style,
  };
  if (hoverSize) {
    mainStyles["height"] = `${hoverSize}px`;
    mainStyles["width"] = `${hoverSize}px`;
  }

  return (
    <div
      style={mainStyles}
      className={clsnm(
        "flex justify-center align-center",
        className,
        hoverable
          ? theme === "dark"
            ? "hover:bg-neutral-900"
            : "hover:bg-neutral-100"
          : undefined,
        hoverable && "radius-lg"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Icon };
