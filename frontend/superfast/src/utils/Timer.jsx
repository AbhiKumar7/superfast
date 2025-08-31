import React, { useEffect, useState } from "react";

function OtpTimerText() {
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 1000); // 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <p>
      OTP expires in{" "}
      {timeLeft === 0 ? (
        <strong>Expired</strong>
      ) : (
        <strong>
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </strong>
      )}
    </p>
  );
}

export default OtpTimerText;
