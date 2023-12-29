"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import EditDescription from "../_components/EditDescription";
import EditTitle from "../_components/EditTitle";
import EditValue from "../_components/EditValue";
import NFTDialog from "../_components/NFTDialog";
import Divider from "@mui/material/Divider";

import type { allEventDto } from "@/lib/types/db";

function MyEventsIdPage() {
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

  function formatTimestamp(timestamp: number) {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString();
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Information</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
      </div>
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
        <div>
          <EditTitle
            eventTitle={dbEvent.title}
            eventId={params.eventId as string}
          />
          <div className="flex flex-col p-2">
            <div className="flex flex-row space-x-4">
              <p className="flex items-center justify-center text-lg">$</p>
              <EditValue
                eventTargetValue={dbEvent.targetValue}
                eventId={params.eventId as string}
              />
            </div>
            <p className="pt-2 text-lg">{`Current Amount: ${dbEvent?.currency}$ ${dbEvent?.currentValue}`}</p>
          </div>
          <p className="p-2 text-lg">
            {`duration: ${formatTimestamp(
              dbEvent.startDate,
            )} – ${formatTimestamp(dbEvent.endDate)}`}
          </p>
          <NFTDialog />
        </div>
      </div>
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Description</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
        <EditDescription
          eventDescription={dbEvent.description}
          eventId={params.eventId as string}
        />
      </div>
    </main>
  );
}

export default MyEventsIdPage;
