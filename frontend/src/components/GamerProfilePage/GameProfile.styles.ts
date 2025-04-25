import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center; 
  padding-top: 1.25rem; 
  padding-bottom: 1.25rem; 
`;

export const Row = styled.div`
  width: 100%; 
`;

export const Col = styled.div`
  @media (min-width: 768px) {
    width: 50%; 
  }
  margin-left: auto;
  margin-right: auto;
`;

export const Spinner = styled.div`
  width: 2rem; 
  height: 2rem; 
  border-top: 4px solid #3b82f6;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent; 
  border-left: 4px solid transparent; 
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
