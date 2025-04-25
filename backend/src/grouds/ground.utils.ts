import {GroundBooking} from "./ground.entity";

export const formatTime = (dateString: Date): { day: number; month: number; year: number; time: string } => {

    const day = String(dateString.getDate()).padStart(2, '0');
    const month = String(dateString.getMonth() + 1).padStart(2, '0');
    const year = dateString.getFullYear();
    const hours = String(dateString.getHours()).padStart(2, '0');
    const minutes = String(dateString.getMinutes()).padStart(2, '0');

    return {
        day: Number(day),
        month: Number(month),
        year: Number(year),
        time: `${hours}:${minutes}`
    };
};

export function formatMarkedDates(bookings: GroundBooking[]): string[] {
    const dates = bookings.map(booking => {
        const y = booking.year.year.toString().padStart(4, '0');
        const m = booking.month.month.toString().padStart(2, '0');
        const d = booking.day.day.toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
    });

    return [...new Set(dates)];
}