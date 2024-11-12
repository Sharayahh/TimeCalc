import React, { useState } from 'react';

function TimeCalculator() {
  const [hoursWorked, setHoursWorked] = useState('');
  const [clockInTime, setClockInTime] = useState('');
  const [result, setResult] = useState('');
  const [clockout, setClockout] = useState('')

  function calculateNewHours() {
    const hours = parseFloat(hoursWorked);
    if (isNaN(hours) || !clockInTime) {
      setResult('Please enter valid hours and time.');
      return;
    }

    const totalHoursRequired = 8;
    const hoursLeft = totalHoursRequired - hours;
    const clockOutTime = calculateClockOutTime(clockInTime, hoursLeft);
    setResult(`Hours left to complete 8 hours: ${hoursLeft.toFixed(2)} hrs.`);
    setClockout(`Clock out at: ${clockOutTime}`)
  }

  function calculateClockOutTime(inTime, hoursLeft) {
    const inDate = new Date(`1970-01-01T${inTime}Z`);
    inDate.setSeconds(inDate.getSeconds() + hoursLeft * 3600); // Add hours left to the last in time

    let hours = inDate.getUTCHours();
    let minutes = inDate.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    return `${hours}:${minutes} ${ampm}`; // Return the time in 12hr format
  }

  return (
    <div class="workCalcContainer">
      <h5>Work Calculator</h5>
      {clockout && <div className="clockoutTime">{clockout}</div>}
      {result && <div className="resultTxt">{result}</div>}
      <div class="calcBox">
      <input
        class="numberOfHrs"
        type="number"
        value={hoursWorked}
        onChange={(e) => setHoursWorked(e.target.value)}
        placeholder="Hours Worked e.g"
      />
      <input
      class="timeOfHrs"
        type="time"
        value={clockInTime}
        onChange={(e) => setClockInTime(e.target.value)}
        placeholder="Clock-in Time"
      />
      </div>
      
      <button class="calculateTime" onClick={calculateNewHours}>Calculate New Hours</button>
      
    </div>
  );
}

export default TimeCalculator;
