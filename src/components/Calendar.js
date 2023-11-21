// Calendar.js
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import moment from 'moment';
import dayjs from 'dayjs';

const Calendar = ({ markedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const generateCalendarGrid = (month) => {
    const startOfMonth = month.clone().startOf('month');
    const endOfMonth = month.clone().endOf('month');

    const daysInMonth = endOfMonth.date();
    const startDayOfWeek = startOfMonth.day();

    const grid = [];

    // Generate previous month's days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = startOfMonth.clone().subtract(i, 'days');
      grid.push({ day, isCurrentMonth: false, isMarked: markedDates.includes(day.format('YYYY-MM-DD')) });
    }

    // Generate current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = startOfMonth.clone().date(i);
      grid.push({ day, isCurrentMonth: true, isMarked: markedDates.includes(day.format('YYYY-MM-DD')) });
    }

    // Generate next month's days
    const remainingDays = 35 - grid.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const day = endOfMonth.clone().add(i, 'days');
      grid.push({ day, isCurrentMonth: false, isMarked: markedDates.includes(day.format('YYYY-MM-DD')) });
    }

    return grid;
  };

  const handleMonthChange = (increment) => {
    setCurrentMonth(currentMonth.clone().add(increment, 'months'));
  };

  useEffect(() => {
    // Fetch your array of marked dates and pass it as a prop
    // Update the grid when the marked dates change
  }, [markedDates]);

  const calendarGrid = generateCalendarGrid(currentMonth);

  return (
    <div style={{ backgroundColor: '#132547'}} className='p-3'>
      <div className='flex items-center justify-between pb-3  px-10'>
        <button onClick={() => handleMonthChange(-1)}>
          <FaArrowLeft />
        </button>
        <h2 className='font-bold text-xl'>{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={() => handleMonthChange(1)}>
          <FaArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarGrid.map((dayObj, index) => (
          <div
            key={index}
            className={`p-2 text-center ${dayObj.isMarked ? 'bg-blue-500 text-white' : ''} ${
              dayObj.isCurrentMonth ? '' : 'text-gray-500'
            }`}
          >
            {dayObj.day.format('D')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
