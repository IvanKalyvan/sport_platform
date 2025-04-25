import styled from 'styled-components';

export const Header = styled.div`
  background: linear-gradient(90deg, #00b4d8, #0077b6); 
  border-radius: 0.5rem; 
  max-width: 100%;
  padding: 1rem; 
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700; 
  color: white;
`;

export const Button = styled.button`
  background-color: #e2e8f0; 
  color: #2d3748;
  padding: 0.5rem 1rem; 
  border-radius: 0.5rem;
  transition: all 0.3s ease; 
  cursor: pointer; 

  &:hover {
    background-color: #cbd5e0; 
  }

  &:focus {
    outline: none; 
  }
`;
