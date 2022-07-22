import { ComponentPropsWithoutRef } from "react";
import { clsnm } from "utils/clsnm";
import styles from "./Layout.module.scss";

interface LayoutProps extends ComponentPropsWithoutRef<"div"> {}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 4rem)" }}
      className={clsnm("flex flex-col h-full", className)}
    >
      {children}
    </div>
  );
};

export { Layout };
