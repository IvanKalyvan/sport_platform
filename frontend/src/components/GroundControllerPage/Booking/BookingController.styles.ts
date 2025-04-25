import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    background-color: #f4f4f4;
`;

export const TopSection = styled.div`
    display: flex;
    width: 100%;
    max-width: 900px;
    gap: 20px;
    align-items: stretch;
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 20px;
`;

export const CalendarWrapper = styled.div`
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

export const MonthButton = styled.button`
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const MonthTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
`;

export const CalendarTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
`;

export const DayHeader = styled.th`
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    background-color: #f0f0f0;
    text-align: center;
`;

export const DayCell = styled.td`
    cursor: pointer;
    padding: 20px;
    font-size: 16px;
    text-align: center;
    transition: background-color 0.3s ease;
    border: 1px solid #ddd;

    &:hover {
        background-color: #e0e0e0;
    }

    &.selected {
        background-color: #007BFF;
        color: white;
        font-weight: bold;
    }
`;

export const DayMarked = styled.td`
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;

    &.selected {
        background-color: #3399ff;
        color: white;
        font-weight: bold;
    }

    &.marked {
        background-color: #d1ffd1;
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
`;

export const TimeInputs = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
`;

export const TimeInput = styled.input`
    padding: 8px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const SaveButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #218838;
    }
`;

export const InfoContainer = styled.div`
    flex: 1;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center; 
`;
