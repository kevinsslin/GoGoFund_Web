"use client";

import { useRef, useEffect, useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

function Playlist({ description }: { description: string}) {
  const [dbevent, setdbevent] = useState({ description: description });
  const [edittingDescription, setEdittingDescription] = useState(false);
  const inputRef2 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edittingDescription && inputRef2.current) {
      inputRef2.current.value = dbevent.description;
    }
  }, [edittingDescription, dbevent.description]); // Update input value when editingName or dbevent.name changes

  const handleUpdateDesc = async () => {
    if (!inputRef2.current) return;

    if (!inputRef2.current.value) {
      alert("List description cannot be empty");
      return;
    }

    const newDesc = inputRef2.current.value;
    if (newDesc !== dbevent.description) {
      setdbevent({ description: newDesc });
    }
    setEdittingDescription(false);
  };

  return (
    <>
      {edittingDescription ? (
        <ClickAwayListener onClickAway={handleUpdateDesc}>
          <Input
            autoFocus
            defaultValue={dbevent.description}
            className="grow break-all p-2 text-xl"
            placeholder="Enter a new description..."
            sx={{ fontSize: "2rem", width: "100%" }}
            inputRef={inputRef2}
            multiline
            rows={3}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEdittingDescription(true)}
          className="w-2rem rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="break-all p-2 text-start text-xl">
            {dbevent.description}
          </Typography>
        </button>
      )}
    </>
  );
}

export default Playlist;
