import Grid from "@mui/material/Grid";

import EventCard from "./_components/EventCard";

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
  return (
    <main className="flex min-h-screen flex-col pl-64 pr-64">
      <Grid container spacing={3} direction="row" justifyContent="flex-start">
        {events.map((e) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            className="p-10"
            key={e.id}
          >
            <EventCard
              key={e.id}
              name={e.name}
              progess={e.progess}
              money={e.money}
              person={e.person}
              time={e.time}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default EventsPage;
