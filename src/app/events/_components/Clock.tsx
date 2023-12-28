"use client";

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // 這裡的型態可以根據實際需求進行更改
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [targetTime, setTargetTime] = useState(new Date(targetDate));
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(currentTime, targetTime));

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
    <div className="flex justify-between flex-row text-dark-blue w-[80%] p-2 space-x-4">
      <div className='flex flex-col items-center justify-center'>
        <p className='w-20 h-15 border-2 p-2 flex items-center justify-center text-2xl'>{remainingTime.days}</p>
        days
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='w-20 h-15 border-2 p-2 flex items-center justify-center text-2xl'>{remainingTime.hours}</p>
        hours
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='w-20 h-15 border-2 p-2 flex items-center justify-center text-2xl'>{remainingTime.minutes}</p>
        minutes
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='w-20 h-15 border-2 p-2 flex items-center justify-center text-2xl'>{remainingTime.seconds}</p>
        seconds
      </div>
    </div>
  );
};

export default CountdownTimer;

