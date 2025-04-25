import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #4f46e5, #6b21a8);
`;

export const Card = styled.div`
    width: 100%;
    max-width: 28rem;
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1.25rem;
`;

export const InputGroup = styled.div`
    text-align: left;
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    font-weight: 600;
    font-size: 0.875rem;
    color: #4a5568;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.625rem;
    margin-top: 0.25rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    transition: border-color 0.3s ease-in-out;

    &:focus {
        border-color: #4f46e5;
        outline: none;
    }
`;

export const Error = styled.div`
    color: #f56565;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
`;

export const LoginButton = styled.button`
    width: 100%;
    padding: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    background-color: #4f46e5;
    color: white;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #4338ca;
    }
`;

export const Footer = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

export const ForgotPassword = styled.button`
    background: transparent;
    border: none;
    color: #4f46e5;
    font-size: 0.875rem;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    padding: 0.25rem 0;
    text-align: center;

    &:hover {
        color: #6366f1;
    }
`;

export const GoHome = styled.button`
    width: 100%;
    padding: 0.625rem;
    font-size: 1.125rem;
    background-color: #e2e8f0;
    color: #2d3748;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #cbd5e0;
    }
`;
