import styled from 'styled-components';

export const Body = styled.body`
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom right, #e0f2f1, #bfdbfe); /* bg-gradient-to-br from-blue-100 to-blue-200 */
  font-family: 'sans-serif'; /* font-sans */
`;

export const Container = styled.div`
  margin-top: 3rem; /* mt-12 */
  display: flex;
  justify-content: center; /* justify-center */
  align-items: center; /* items-center */
  height: 100vh; /* h-screen */
`;

export const Card = styled.div`
  padding: 2rem; /* p-8 */
  border-radius: 0.75rem; /* rounded-lg */
  background-color: white; /* bg-white */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* shadow-xl */
  max-width: 450px; /* max-w-[450px] */
  width: 100%; /* w-full */
  text-align: center; /* text-center */
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem; /* mb-6 */
  color: #1e3a8a; /* text-blue-800 */
  font-weight: 700; /* font-bold */
  font-size: 1.5rem; /* text-2xl */
  letter-spacing: 0.05em; /* tracking-wider */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column; /* flex-col */
  gap: 1.25rem; /* gap-5 */
`;

export const Button = styled.button`
  margin-top: 1rem; 
  padding: 0.75rem;
  background-color: #1e40af;
  color: white; 
  width: 100%; 
  border-radius: 0.75rem; 
  font-size: 1.125rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #1e3a8a; 
  }
`;

export const FooterButton = styled.button`
  background: transparent;
  border: none;
  color: #1e40af; 
  font-weight: 700;
  font-size: 0.875rem; 
  cursor: pointer;
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #1d4ed8; 
    transform: scale(1.05); 
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 0.5rem; 
  text-align: left; 
`;

export const InputGroupLabel = styled.label`
  font-size: 0.875rem; 
  font-weight: 600; 
  color: #4b5563; 
`;

export const Input = styled.input`
  padding: 0.75rem; 
  font-size: 0.875rem; 
  border-radius: 0.5rem; 
  border: 1px solid #d1d5db; 
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #1e40af; 
    ring: 2px solid #93c5fd;
  }
`;

export const Error = styled.div`
  color: #dc2626;
  font-size: 0.875rem; 
`;

export const FooterLink = styled.a`
  color: #1e40af;
  font-weight: 700;

  &:hover {
    color: #1d4ed8;
  }
`;
