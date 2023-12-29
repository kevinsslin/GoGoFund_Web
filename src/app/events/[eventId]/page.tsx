"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import Clock from "../../../components/Clock";
import ProductIntro from "../../../components/ProductIntro";
import { CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NoSsr from "@mui/material/NoSsr";
import Typography from "@mui/material/Typography";

import type { allEventDto } from "@/lib/types/db";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} size="6rem" />
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
  const params = useParams();
  const [dbEvent, setDbEvent] = useState<allEventDto>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/events/${params.eventId}`);
      const data = await response.json();
      setDbEvent(data);
    };
    fetchData();
  }, [params.eventId]);

  function formatTimestamp(timestamp: string) {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString();
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex flex-row justify-center">
        <div className="pr-24">
          <Image
            src="/events.jpeg"
            alt="event"
            width={400}
            height={400}
            className="p-5 "
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="p-4 text-6xl font-bold">{dbEvent?.title}</p>
          <div className="flex flex-row items-center p-4">
            <CircularProgressWithLabel
              value={(dbEvent.currentValue / dbEvent.targetValue) * 100}
            />
            <div className="pl-8">
              <p className="text-md pb-2">{`目標金額 NTD$ ${dbEvent?.targetValue}`}</p>
              <p className="pt-2 text-xl font-bold">{`已募集 ${dbEvent?.currency}$ ${dbEvent?.currentValue}`}</p>
            </div>
          </div>
          <p className="text-md p-2">
            {`duration: ${formatTimestamp(
              dbEvent.startDate,
            )} – ${formatTimestamp(dbEvent.endDate)}`}
          </p>
          <NoSsr>
            <Clock targetDate={dbEvent.endDate} />
          </NoSsr>
          <button className="h-15 m-4 flex w-64 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white">
            Fund the Project
          </button>
        </div>
      </div>
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Description</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
        <p className="break-all p-2 text-xl">{dbEvent.description}</p>
      </div>
      <div className="justify-cent flex w-[50%] flex-col p-8">
        <ProductIntro />
      </div>
    </div>
  );
}

export default EventsIdPage;
