"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import Clock from "../_components/Clock";
import ProductIntro from "../_components/ProductIntro";
import { CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NoSsr from "@mui/material/NoSsr";
import Typography from "@mui/material/Typography";

import { type eventDetailDto } from "@/lib/types/db";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} size="4rem" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="dark-blue"
          className="text-xl font-bold"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
function EventsIdPage() {
  const { eventId } = useParams();
  console.log(eventId);
  const [dbEvents, setDbEvents] = useState<eventDetailDto>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/events/${eventId}`);
      console.log(response);
      const data = await response.json();
      setDbEvents(data);
    };
    fetchData();
  }, [eventId]);

  if (!dbEvents) {
    return <div>loading...</div>;
  }
  const {
    currency,
    description,
    endDate,
    imageSrc,
    startDate,
    targetValue,
    currentValue,
    title,
    nfts,
  } = dbEvents;
  // Calculate the progress percentage
  const progress = dbEvents.currentValue
    ? (currentValue / targetValue) * 100
    : 0;
  const now = new Date().toLocaleDateString();
  const start = new Date(Number(startDate)).toLocaleDateString();
  const end = new Date(Number(endDate)).toLocaleDateString();

  let targetDate;
  if (now < start) {
    // If the current date is before the start date, use the start date
    targetDate = start;
  } else if (now >= start && now < end) {
    // If the current date is between the start date and the end date, use the end date
    targetDate = end;
  } else {
    // If the current date is after the end date, you might want to handle this case differently
    // For now, we will just use the end date
    targetDate = end;
  }
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-row justify-center">
        <div className="pr-24">
          <Image
            src={imageSrc ? imageSrc : "/events.jpeg"}
            alt={title}
            width={400}
            height={400}
            className="p-5 "
          />
        </div>
        <div>
          <p className="p-4 text-6xl font-bold">{title}</p>
          <div className="flex flex-row items-center p-4">
            <CircularProgressWithLabel value={progress} />
            <div className="pl-8">
              <p className="text-md pb-2">
                目標金額 {currency}$ {targetValue}
              </p>
              <p className="pt-2 text-xl font-bold">
                已募集 {currency}$ {targetValue}
              </p>
            </div>
          </div>
          <p className="text-md p-2">
            募資期間 {start} – {end}
          </p>
          <NoSsr>
            <Clock targetDate={targetDate} />
          </NoSsr>
          <button className="h-15 m-4 flex w-64 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white">
            我要贊助
          </button>
        </div>
      </div>
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">
          description :
        </p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
        <p className="break-all p-2 text-xl">{description}</p>
      </div>
      <div className="justify-cent flex w-[50%] flex-col p-8">
        <ProductIntro nfts={nfts} />
      </div>
    </main>
  );
}

export default EventsIdPage;
