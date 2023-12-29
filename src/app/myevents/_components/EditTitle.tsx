"use client";

import { useRef, useEffect, useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useAccount } from "wagmi";

import { updateEvent } from "./actions";

type Props = {
  eventTitle: string;
  eventId: number;
};

function EditTitle({ eventTitle, eventId }: Props) {
  const [edittingTitle, setEdittingTitle] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const { address } = useAccount();

  useEffect(() => {
    if (edittingTitle && titleRef.current) {
      titleRef.current.value = eventTitle;
    }
  }, [edittingTitle, eventTitle]);

  const handleUpdateTitle = async () => {
    if (!titleRef.current) return;

    if (!titleRef.current.value) {
      alert("List title cannot be empty");
      return;
    }
    updateEvent(address, eventId, { title: titleRef.current.value });
    setEdittingTitle(false);
  };

  return (
    <>
      {edittingTitle ? (
        <ClickAwayListener onClickAway={handleUpdateTitle}>
          <Input
            autoFocus
            defaultValue={eventTitle}
            className="p-2 text-2xl"
            placeholder="Enter a new title..."
            sx={{ width: "100%" }}
            inputRef={titleRef}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEdittingTitle(true)}
          className="w-full rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="break-all text-start text-5xl font-bold">
            {eventTitle}
          </Typography>
        </button>
      )}
    </>
  );
}

export default EditTitle;
