"use client";

import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import { type allEventDto } from "@/lib/types/db";

import EventCard from "./_components/EventCard";
import GetFondDialog from "./_components/GetFondDialog";

const events = [
  { name: "name", progess: 92.77, person: 1000, money: 9999, time: 20, id: 1 },
  { name: "apple", progess: 9.7, person: 102, money: 9, time: 320, id: 2 },
  { name: "kevin", progess: 10.1, person: 1, money: 1314, time: 200, id: 3 },
  { name: "wp1121", progess: 22.1, person: 30, money: 99678, time: 48, id: 4 },
  { name: "ntu", progess: 59.77, person: 92, money: 778594, time: 60, id: 5 },
  { name: "kk", progess: 80.2, person: 1980, money: 95532, time: 3944, id: 6 },
  {
    name: "books",
    progess: 100.77,
    person: 863,
    money: 78443,
    time: 302,
    id: 7,
  },
];

function EventsPage() {
  const [dbEvents, setDbEvents] = useState<allEventDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setDbEvents(data);
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pl-32 pr-32">
      <div className="w-[80%]">
        <div className="flex justify-end">
          <GetFondDialog />
        </div>
        <Grid container spacing={3} direction="row" justifyContent="flex-start">
          {events.map((e) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="p-10"
              key={e.id}
            >
              <EventCard
                id={e.id?.toString()}
                key={e.id}
                name={e.name}
                currency="NT"
                progess={e.progess}
                money={e.money}
                person={e.person}
                time={e.time}
              />
            </Grid>
          ))}
          {dbEvents.map((e) => {
            // Calculate time remaining in days
            const timeRemaining =
              (e.endDate - new Date().getTime()) / (1000 * 60 * 60 * 24);
            const daysRemaining =
              timeRemaining > 0 ? Math.ceil(timeRemaining) : 0;

            // Calculate progress
            const progress =
              e.targetValue !== 0 ? (e.currentValue / e.targetValue) * 100 : 0;

            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                className="p-10"
                key={e.displayId}
              >
                <EventCard
                  id={e.displayId}
                  key={e.displayId}
                  name={e.title}
                  currency={e.currency}
                  progess={progress}
                  money={e.currentValue}
                  person={0} // Assuming this is correct; replace with actual data if available
                  time={daysRemaining}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </main>
  );
}

export default EventsPage;
