import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Card = styled.section`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(25, 9, 46, 0.12);
  padding: 28px;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

export const Brand = styled.h1`
  margin: 0 0 8px 0;
  font-size: 20px;
  letter-spacing: -0.2px;
  color: #ffffff;
`;

export const Subtitle = styled.p`
  margin: 0 0 18px 0;
  color: #cacacaca;
  font-size: 14px;
`;

export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  color: #cacacaca;
  margin-bottom: 6px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Remember = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #cacacaca;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #c0392b;
  font-size: 13px;
`;
