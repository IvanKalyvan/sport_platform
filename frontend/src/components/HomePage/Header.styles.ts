import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #1a202c; 
  color: white;
  padding: 1rem; 
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  max-width: 100rem; 
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavbarBrand = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const NavbarButton = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #1a202c;
  }
`;
