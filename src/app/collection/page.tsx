"use client";

import React, { useEffect, useState } from "react";
import EventCard from "./_component/collectionCard";
import { Divider, Grid } from "@mui/material";
import { useAccount } from "wagmi";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import UserDialog from "@/components/UserDialog";
import { Button } from "@mui/material";
import AvatarSelector from "./_component/AvatarSelect";
import type { myCollectionEvent, Transaction } from "@/lib/types/db";

function CollectionPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { address } = useAccount();
  const [dbEvents, setDbEvents] = useState<myCollectionEvent[] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Transaction[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (event:Transaction[]) => {
    setSelectedEvent(event);
    console.log(event);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${address}`);
      const data = await response.json();
      setName(data.username);
      setEmail(data.email);
    };
    const fetchEvents = async () => {
      const reponse = await fetch(`/api/mycollection/${address}`);
      const data = await reponse.json();
      setDbEvents(data);
    }
    fetchUser();
    fetchEvents();
  }, [address]);

  const handelClick = () => {
    setOpen(true);
  };

  return (
    <>
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
        <p className="pt-6 text-lg">{dbEvents?dbEvents.length:0} collections</p>
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
          {!dbEvents ? (
            <p className="text-4xl">You have no events now.</p>
          ) : (
            (
              dbEvents.map((e) => {
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
                  <Button
                    onClick={() => handleCardClick(e.transactions)}
                  >
                  <EventCard
                    id={e.displayId}
                    key={e.displayId}
                    name={e.title}
                    currency={e.currency}
                    progess={progress}
                    money={e.currentValue}
                    person={0}
                    time={daysRemaining}
                  />
                  </Button>
                </Grid>)
              }
            )
            )
          )}
        </Grid>
      </div>
      <UserDialog open={open} setOpen={setOpen} />
    </main>
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      {selectedEvent && selectedEvent.map((transaction, index) => (
        <React.Fragment key={index}>
          <DialogTitle>
            {transaction.transactionDate}
          </DialogTitle>
          <DialogContent className="space-y-2">
            {transaction.items.map((nft, nftIndex) => (
              <div className="flex flex-row space-x-4" key={nftIndex}>
                  {nft.name}
                  {nft.price}
              </div>
            ))}
          </DialogContent>
        </React.Fragment>
      ))}
      </Dialog>
    </>
  );
}

export default CollectionPage;
