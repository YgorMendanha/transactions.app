import styled from "styled-components";

export const WrapperDate = styled.div`
  display: flex;
  flex-direction: column;
  .rdrDefinedRangesWrapper,
  .rdrStaticRange,
  .rdrMonth,
  .rdrMonthAndYearWrapper,
  .rdrDateDisplayWrapper,
  .rdrStaticRangeLabel {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
  .rdrDayNumber span {
    color: ${({ theme }) => theme.colors.text};
  }
  .rdrMonthAndYearPickers select {
    color: ${({ theme }) => theme.colors.text};
  }
  .rdrMonth {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 80vw;
  }
`;
