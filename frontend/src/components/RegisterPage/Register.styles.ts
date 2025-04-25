import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #b3e5fc);
`;

export const Container = styled.div`
  background: linear-gradient(145deg, #ffffff, #f1f8ff, #e3f2fd);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  border: 1px solid #ddd;
  background-size: 400% 400%;
  animation: gradientBackground 5s ease infinite;

  @keyframes gradientBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const Heading = styled.h2`
  margin-bottom: 20px;
  color: #007bff;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath fill="none" d="M1 4l7 7 7-7H1z"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;

  &:focus {
    border-color: #007bff;
  }
`;

export const Error = styled.p`
  color: #d9534f;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-align: left;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

export const BackButton = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border: none;
  background: #6c757d;
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #5a6268;
  }
`;
