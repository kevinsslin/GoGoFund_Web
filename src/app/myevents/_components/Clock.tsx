"use client";

import React, { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: string; // 這裡的型態可以根據實際需求進行更改
};

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [targetTime] = useState(new Date(targetDate));
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(currentTime, targetTime),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setRemainingTime(calculateRemainingTime(currentTime, targetTime));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime, targetTime]);

  function calculateRemainingTime(currentTime: Date, targetTime: Date) {
    const timeDifference = targetTime.getTime() - currentTime.getTime();
    const remainingSeconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(remainingSeconds / (24 * 3600));
    const hours = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="flex w-[80%] flex-row justify-between space-x-4 p-2 text-dark-blue">
      <div className="flex flex-col items-center justify-center">
        <p className="h-15 flex w-20 items-center justify-center border-2 p-2 text-2xl">
          {remainingTime.days}
        </p>
        days
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="h-15 flex w-20 items-center justify-center border-2 p-2 text-2xl">
          {remainingTime.hours}
        </p>
        hours
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="h-15 flex w-20 items-center justify-center border-2 p-2 text-2xl">
          {remainingTime.minutes}
        </p>
        minutes
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="h-15 flex w-20 items-center justify-center border-2 p-2 text-2xl">
          {remainingTime.seconds}
        </p>
        seconds
      </div>
    </div>
  );
}

export default CountdownTimer;
