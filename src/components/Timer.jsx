import React, { useEffect, useState } from 'react';

function Timer({ time }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease the time by 1000 milliseconds (1 second)
      time -= 1000;

      // Calculate hours, minutes, and seconds from remaining time
      const hours = Math.floor(time / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);

      // Update state variables
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      // Check if the countdown has reached 0
      if (time <= 0) {
        clearInterval(timer); // Stop the timer
        console.log("Countdown finished!"); // You can replace this with any action you want to take when the countdown finishes
      }
    }, 1000); // Update every second

    // Clean up timer on component unmount
    return () => clearInterval(timer);
  }, [time]); // Run effect whenever time changes

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
      </div>
    </div>
  );
}

export default Timer;
