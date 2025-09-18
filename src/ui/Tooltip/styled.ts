import styled from "styled-components";

export const WrapperTooltip = styled.div`
  position: relative;
  display: inline-block;
`;

export const Bubble = styled.div<{ $visible: boolean }>`
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.15s ease;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  position: absolute;
  top: 120%;
  right: 0;
  white-space: nowrap;
  z-index: 999;

  background: ${({ theme }) => `${theme.colors.border}CC`};
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;

  @media (max-width: 600px) {
    left: 50%;
    right: auto;
    transform: translateX(-60%);
  }
`;
