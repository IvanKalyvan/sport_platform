import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    background: linear-gradient(to right, #3b82f6, #1e40af);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
    margin-left: 1rem;
    padding: 0.625rem 1.25rem;
    border: none;
    background-color: white;
    color: #3b82f6;
    font-weight: 600;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #1e40af;
        color: white;
    }
`;
