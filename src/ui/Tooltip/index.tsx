import React, { ReactNode, useRef, useState, useEffect } from "react";
import { Bubble, WrapperTooltip } from "./styled";

type Props = {
  content: ReactNode;
  children: ReactNode;
  closeDelay?: number;
};

export const Tooltip: React.FC<Props> = ({
  content,
  children,
  closeDelay = 150,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const open = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    setVisible(true);
  };

  const close = (e: React.MouseEvent | React.FocusEvent) => {
    const related = e.relatedTarget as Node | null;
    if (related && ref.current && ref.current.contains(related)) return;
    timer.current = window.setTimeout(() => {
      setVisible(false);
      timer.current = null;
    }, closeDelay);
  };

  return (
    <WrapperTooltip
      ref={ref}
      onMouseEnter={open}
      onFocus={open}
      onMouseLeave={close}
      onBlur={close}
    >
      {children}
      <Bubble $visible={visible} role="tooltip" aria-hidden={!visible}>
        {content}
      </Bubble>
    </WrapperTooltip>
  );
};
