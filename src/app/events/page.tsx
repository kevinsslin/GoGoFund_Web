"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextArea from "@mui/material/TextareaAutosize";
import { useAccount } from "wagmi";

import { type allEventDto } from "@/lib/types/db";

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
  const [state, setState] = useState(false);
  const [dbEvents, setDbEvents] = useState<allEventDto[]>([]);

  const { address } = useAccount();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setDbEvents(data);
    };
    fetchData();
  }, []);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (event.target instanceof Element) {
        setState(open);
      }
    };

  const [formData, setFormData] = useState({
    address: address?.toString() || "",
    title: "",
    description: "",
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    targetValue: 0,
    currency: "",
    image: null as File | null,
  });

  // Define handleChange to update formData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Update formData with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      ["image"]: file,
    });
  };

  // Define handleSubmit to create a new event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting:", formData);
    // const data = new FormData()
    // for (const [key, value] of Object.entries(formData)) {
    //   if (key === 'image' && value instanceof File) {
    //     data.append('image', value, value.name);
    //   } else {
    //     data.append(key, String(value));
    //   }
    // }
    // await createEvents(formData);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from API:", errorData.error);
        // Handle error: Display it in UI, etc.
      } else {
        const eventData = await response.json();
        console.log("Event data:", eventData);
        // Process eventData as needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const list = () => (
    <Box sx={{ width: 500 }} role="presentation">
      <form onSubmit={handleSubmit}>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Create Event" />
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="name">Title : </InputLabel>

              <Input
                id="name"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="ml-2"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="description">Description : </InputLabel>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="ml-2 w-[70%]"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="startDate">StartDate : </InputLabel>

              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="ml-2"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="endDate">EndDate : </InputLabel>

              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="ml-2"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="targetValue">TargetValue : </InputLabel>

              <Input
                id="targetValue"
                name="targetValue"
                type="number"
                value={formData.targetValue}
                onChange={handleChange}
                required
                className="ml-2"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="currency"> Currency: </InputLabel>

              <Input
                id="currency"
                name="currency"
                type="text"
                value={formData.currency}
                onChange={handleChange}
                required
                className="ml-2"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InputLabel htmlFor="name">Image : </InputLabel>

              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                required
                className="ml-2"
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
  return (
    <main className="flex min-h-screen flex-col pl-32 pr-32 items-center justify-center">
      <div className="w-[80%]">
      <div className="flex justify-end">
        <button className="flex h-10 w-30 items-center justify-center rounded-2xl bg-dark-blue p-4 m-4 text-xl font-bold text-white" onClick={toggleDrawer(true)}>
          Get Fund
        </button>
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
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
    </main>
  );
}

export default EventsPage;