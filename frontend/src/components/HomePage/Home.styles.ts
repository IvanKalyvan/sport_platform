import styled from 'styled-components';

export const Alert = styled.div`
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.375rem;
    background-color: #fed7d7;
    color: #e53e3e;
    border: 1px solid #fc8181;
    font-size: 0.875rem;
    font-weight: 500;
`;

export const SpinnerContainer = styled.div`
    text-align: center;
    margin-top: 1.25rem;
`;

export const Spinner = styled.div`
    width: 4rem;
    height: 4rem;
    border-width: 0.25rem;
    border-top-color: transparent;
    border-color: #3182ce;
    border-style: solid;
    border-radius: 9999px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const HomeContainer = styled.div`
    background-color: #f7fafc;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    padding: 2rem;
    border-radius: 1rem;
    background: linear-gradient(to top, #f472b6, #fbbf24);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    max-width: 32rem;
`;

export const CardTitle = styled.h1`
    color: white;
    font-weight: 600;
    font-size: 1.875rem;
    margin-bottom: 1.5rem;
`;

export const CardText = styled.p`
    color: white;
    font-size: 1.125rem;
    margin-bottom: 2rem;
`;

export const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 9999px;
    font-size: 1.125rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    &:focus {
        outline: none;
    }

    ${({ variant }) =>
            variant === 'primary'
                    ? `
        background-color: #3182ce;
        color: white;
        border: none;

        &:hover {
          background-color: #2b6cb0;
        }
      `
                    : `
        background-color: #4a5568;
        color: white;
        border: none;

        &:hover {
          background-color: #2d3748;
        }
      `}
`;
