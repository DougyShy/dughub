import React, { useState } from "react";

const Calendar = ({ userName }) => {
  const [Calendar, setCalendar] = useState([]);

  return userName ? (
    <div>User Calendar for {userName}</div>
  ) : (
    <div>No User Calendar</div>
  );
};

export default Calendar;
