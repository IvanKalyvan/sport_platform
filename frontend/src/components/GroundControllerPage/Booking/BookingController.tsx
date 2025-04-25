// noinspection JSAnnotator

import React, { useState, useEffect } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isBefore
} from 'date-fns';
import Header from "./Header";
import * as S from './BookingController.styles';
import axios from 'axios';
import { useGroundManagement } from '../../../context/GroundManagementContext';

const BookingPage = () => {
    const { groundType, objectId } = useGroundManagement();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isPastDate, setIsPastDate] = useState(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [markedDates, setMarkedDates] = useState<string[]>([]);

    useEffect(() => {
        fetchMarkedDates();
    }, [currentDate]);

    const fetchMarkedDates = async () => {
        const year = Number(currentDate.getFullYear());
        const month = Number(currentDate.getMonth() + 1);
        try {
            const response = await axios.get(`http://localhost:3001/ground/marked-dates`, {
                params: {
                    objectId,
                    year,
                    month
                },
                withCredentials: true
            });
            setMarkedDates(response.data.markedDates); // format ['2025-04-08', '2025-04-12']
        } catch (error) {
            console.error("Error fetching marked dates:", error);
        }
    };

    const fetchBookingForDate = async (date: Date) => {
        const formatted = format(date, "yyyy-MM-dd");
        try {
            const response = await axios.get("http://localhost:3001/ground/booking-for-date", {
                params: {
                    groundId: objectId,
                    date: formatted
                },
                withCredentials: true
            });

            if (response.data && response.data.start_time && response.data.end_time) {
                setStartTime(format(new Date(response.data.start_time), "HH:mm"));
                setEndTime(format(new Date(response.data.end_time), "HH:mm"));
            } else {
                setStartTime("");
                setEndTime("");
            }
        } catch (error) {
            console.error("Error fetching booking for date:", error);
        }
    };

    const handleMonthChange = (direction: 'prev' | 'next') => {
        const newDate = direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1);
        setCurrentDate(newDate);
    };

    const handleSaveBooking = async () => {
        if (!selectedDate || (groundType !== 'Gridiron' && (!startTime || !endTime))) return alert("Select a date and time");

        const selectedDateISO = format(selectedDate, "yyyy-MM-dd");
        const startISO = groundType === 'Gridiron' ? `${selectedDateISO}T00:00:00.000Z` : new Date(`${selectedDateISO}T${startTime}:00.000Z`).toISOString();
        const endISO = groundType === 'Gridiron' ? `${selectedDateISO}T23:59:59.000Z` : new Date(`${selectedDateISO}T${endTime}:00.000Z`).toISOString();

        try {
            const response = await axios.post("http://localhost:3001/ground/create-booking", {
                groundId: objectId,
                start_time: startISO,
                end_time: endISO
            }, { withCredentials: true });

            if (response.status !== 200) throw new Error("Booking error");

            alert("Booking successfully created!");
            fetchMarkedDates();
        } catch (error) {
            console.error("Error:", error);
            alert("Error while sending the request");
        }
    };

    const renderCalendar = () => {
        const startOfMonthDate = startOfMonth(currentDate);
        const endOfMonthDate = endOfMonth(currentDate);
        const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

        return (
            <S.CalendarWrapper>
                <S.CalendarHeader>
                    <S.MonthButton onClick={() => handleMonthChange('prev')}>Prev</S.MonthButton>
                    <S.MonthTitle>{format(currentDate, 'MMMM yyyy')}</S.MonthTitle>
                    <S.MonthButton onClick={() => handleMonthChange('next')}>Next</S.MonthButton>
                </S.CalendarHeader>

                <S.CalendarTable>
                    <thead>
                    <tr>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <S.DayHeader key={day}>{day}</S.DayHeader>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {daysInMonth.slice(rowIndex * 7, rowIndex * 7 + 7).map((day) => {
                                const isPastDay = isBefore(day, new Date());
                                const dayStr = format(day, "yyyy-MM-dd");
                                const isMarked = markedDates.includes(dayStr);
                                const isSelected = selectedDate && isSameDay(day, selectedDate);

                                return (
                                    <S.DayMarked
                                        key={day.toString()}
                                        className={`
                                            ${isSelected ? 'selected' : ''}
                                            ${isMarked && !isSelected ? 'marked' : ''}
                                        `}
                                        onClick={() => {
                                            setSelectedDate(isSelected ? null : day); // Deselect if same day is clicked
                                            setIsPastDate(isPastDay);
                                            fetchBookingForDate(day);
                                        }}
                                        style={isPastDay ? { backgroundColor: '#ddd' } : {}}
                                    >
                                        {format(day, 'd')}
                                    </S.DayMarked>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </S.CalendarTable>
            </S.CalendarWrapper>
        );
    };

    return (
        <>
            <Header />
            <S.Container>
                <S.TopSection>
                    <S.LeftColumn>
                        {renderCalendar()}
                        <S.FormContainer>
                            {groundType !== "Gridiron" ? (
                                <>
                                    <h3>Set Booking Intervals</h3>
                                    {isPastDate ? (
                                        <p>You can no longer change the time for this date.</p>
                                    ) : (
                                        <>
                                            <S.TimeInputs>
                                                <S.TimeInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                                <S.TimeInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                            </S.TimeInputs>
                                            <S.SaveButton onClick={handleSaveBooking} disabled={isPastDate}>Save</S.SaveButton>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h3>Select a Date</h3>
                                    <S.SaveButton onClick={handleSaveBooking} disabled={isPastDate}>Save</S.SaveButton>
                                </>
                            )}
                        </S.FormContainer>
                    </S.LeftColumn>

                    <S.InfoContainer>
                        {selectedDate ? (
                            <div>
                                <h3>Booking Info</h3>
                                <p>Date: {format(selectedDate, 'yyyy-MM-dd')}</p>
                                {groundType !== "Gridiron" && (
                                    <>
                                        <p>Start Time: {startTime}</p>
                                        <p>End Time: {endTime}</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p>Select a date to view details</p>
                        )}
                    </S.InfoContainer>
                </S.TopSection>
            </S.Container>
        </>
    );
};

export default BookingPage;
