import { Placement } from "@floating-ui/react-dom";
import { usePopper } from "hooks";
import { ReactNode, useEffect, useRef, useState } from "react";
import { clsnm } from "utils/clsnm";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  children: ReactNode;
  placement?: Placement;
  content: ReactNode;
  padding?: string;
  className?: string;
}

const Tooltip = ({
  children,
  placement,
  content,
  padding = "8px 12px",
  className,
}: TooltipProps) => {
  const { reference, floating, popperStyles } = usePopper({
    placement: placement,
    topDistance: 8,
  });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    let timer: any;

    const openHandler = () => {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
    };
    const closeHandler = () => {
      clearTimeout(timer);
      setIsOpen(false);
    };

    wrapperRef.current.addEventListener("mouseenter", openHandler);
    wrapperRef.current.addEventListener("mouseleave", closeHandler);

    return () => {
      if (!wrapperRef.current) return;
      wrapperRef.current.removeEventListener("mouseenter", openHandler);
      wrapperRef.current.removeEventListener("mouseleave", closeHandler);
    };
  }, []);

  return (
    <span
      className={clsnm("flex items-center justify-center", className)}
      ref={wrapperRef}
    >
      <span ref={reference}>{children}</span>

      <span
        className={clsnm(styles.tooltip, "bg-neutral-900 text-white")}
        ref={floating}
        style={{
          ...popperStyles,
          opacity: isOpen ? 1 : 0,
          padding: padding,
        }}
      >
        {content}
      </span>
    </span>
  );
};

export { Tooltip };
