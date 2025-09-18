import styled from "styled-components";

export const WrapperSelect = styled.div<{ $full?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ $full }) => ($full ? "100%" : "auto")};
`;

export const StyledSelect = styled.select<{ $full?: boolean; $open?: boolean }>`
  width: 100%;
  padding: 10px 36px 10px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;
  + span {
    transform: translateY(-50%) rotate(90deg);
  }
  &:hover + span {
    transform: translateY(-50%) rotate(0deg);
  }
`;

export const IconWrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.primary};
  transition: transform 0.3s ease;
`;
