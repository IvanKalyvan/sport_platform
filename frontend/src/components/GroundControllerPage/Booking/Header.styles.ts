import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  background: transparent;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
  }
`;

export const ButtonPrimary = styled(Button)`
  background: black;
  color: white;

  &:hover {
    background: gray;
  }
`;
