"use client";

import React, { useEffect, useState } from "react";

import EventCard from "../events/_components/EventCard";
import { Divider, Grid } from "@mui/material";

import UserDialog from "@/components/UserDialog";

import AvatarSelector from "./_component/AvatarSelect";

import { useAccount } from "wagmi";

function CollectionPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${address}`);
      const data = await response.json();
      setName(data.username);
      setEmail(data.email);
    };
    fetchData();
  }, [address]);

  const handelClick = () => {
    setOpen(true);
  };

  const mockdbevent = [
    {
      name: "name",
      progess: 92.77,
      person: 1000,
      money: 9999,
      time: 20,
      id: 1,
    },
    { name: "apple", progess: 9.7, person: 102, money: 9, time: 320, id: 2 },
    { name: "kevin", progess: 10.1, person: 1, money: 1314, time: 200, id: 3 },
    {
      name: "wp1121",
      progess: 22.1,
      person: 30,
      money: 99678,
      time: 48,
      id: 4,
    },
    { name: "ntu", progess: 59.77, person: 92, money: 778594, time: 60, id: 5 },
    {
      name: "kk",
      progess: 80.2,
      person: 1980,
      money: 95532,
      time: 3944,
      id: 6,
    },
    {
      name: "books",
      progess: 100.77,
      person: 863,
      money: 78443,
      time: 302,
      id: 7,
    },
  ];

  return (
    <main className="flex flex-row justify-center space-x-40 pl-32 pr-32">
      <div className="flex flex-col items-start">
        <AvatarSelector />
        <p className="pt-6 text-5xl">{name}</p>
        <p className="pb-6 pt-6 text-2xl">{email}</p>
        <button
          className="w-64 rounded-md border-2 p-2 text-lg"
          onClick={handelClick}
        >
          edit profile
        </button>
        <p className="pt-6 text-lg">{mockdbevent.length} collections</p>
      </div>
      <div className="flex w-[60%] flex-col items-start">
        <p className="flex justify-start p-2 text-4xl font-bold">
          My Collections
        </p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1, width: "100%" }}
        />
        <div className="p-4"></div>
        <Grid container spacing={3} direction="row" justifyContent="flex-start">
          {mockdbevent.length === 0 ? (
            <p className="text-4xl">You have no events now.</p>
          ) : (
            mockdbevent.map((e) => (
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
                  currency="NTD"
                  progess={e.progess}
                  money={e.money}
                  person={e.person}
                  time={e.time}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
      <UserDialog open={open} setOpen={setOpen} />
    </main>
  );
}

export default CollectionPage;